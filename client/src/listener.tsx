import RecordRTC, { StereoAudioRecorder } from 'recordrtc';
import store from './app/redux';

// set initial state of application variables
let socket: WebSocket | null;
let recorder: RecordRTC | null;

// runs real-time transcription
const listener = async () => {
  if (socket) {
    socket.send(JSON.stringify({ terminate_session: true }));
    socket.close();
    socket = null;
  }

  if (recorder) {
    recorder.pauseRecording();
    recorder = null;
  }

  const response = await fetch('http://127.0.0.1:8080/assembly-token'); // get temp session token from server
  const data = await response.json();

  if (data.error) {
    alert(data.error);
  }

  const { token } = data;

  // establish wss with AssemblyAI (AAI) at 16000 sample rate
  socket = await new WebSocket(
    `wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000&token=${token}`
  );

  // handle incoming messages to display transcription to the DOM
  socket.onmessage = (message: MessageEvent) => {
    const res = JSON.parse(message.data);
    res.text !== undefined &&
      store.dispatch({ type: 'AUDIO/addTranscript', payload: res.text });
  };

  socket.onerror = (event: Event) => {
    console.error(event);
    socket!.close();
    listener();
  };

  socket.onclose = (event: CloseEvent) => {
    console.log(event);
    socket = null;
    listener();
  };

  socket.onopen = () => {
    // once socket is open, begin recording
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream: MediaStream) => {
        recorder = new RecordRTC(stream, {
          type: 'audio',
          mimeType: 'audio/webm;codecs=pcm', // endpoint requires 16bit PCM audio
          recorderType: StereoAudioRecorder,
          timeSlice: 250, // set 250 ms intervals of data that sends to AAI
          desiredSampRate: 16000,
          numberOfAudioChannels: 1, // real-time requires only one channel
          bufferSize: 4096,
          audioBitsPerSecond: 128000,
          ondataavailable: (blob: Blob) => {
            const reader = new FileReader();
            reader.onload = () => {
              const base64data = reader.result as string;

              // audio data must be sent as a base64 encoded string
              if (socket) {
                socket.send(
                  JSON.stringify({ audio_data: base64data.split('base64,')[1] })
                );
              }
            };
            reader.readAsDataURL(blob);
          },
        });

        recorder.startRecording();
      })
      .catch((err: any) => console.error(err));
  };
};

export { listener };
