import json

import base64
import asyncio
import pyaudio
import websockets
from urllib.parse import urlencode
p = pyaudio.PyAudio()
CHUNK = 12000 # number of audio samples per frame
FORMAT = pyaudio.paInt16 # audio format
CHANNELS = 1 # mono audio
SAMPLE_RATE = int(p.get_device_info_by_index(1)['defaultSampleRate']) # audio sampling rate
API_KEY = '204c82e7f22e4f5fb5117a5b70c6ddd9'
word_boost = ["SPY", "QQQ", 'Mira', 'Hey']
params = {"sample_rate": SAMPLE_RATE, "word_boost": json.dumps(word_boost)}
ASSEMBLYAI_ENDPOINT =  f"wss://api.assemblyai.com/v2/realtime/ws?{urlencode(params)}"


audio_stream = stream = p.open(format=FORMAT,
                channels=CHANNELS,
                rate=SAMPLE_RATE,
                input=True,
                frames_per_buffer=CHUNK)


async def speech_to_text():
    """
    Asynchronous function used to perfrom real-time speech-to-text using AssemblyAI API
    """
    async with websockets.connect(
           ASSEMBLYAI_ENDPOINT,
           ping_interval=5,
           ping_timeout=20,
           extra_headers=(('Authorization', API_KEY), ),
    ) as ws_connection:
        await asyncio.sleep(0.5)
        await ws_connection.recv()
        print('Websocket connection initialised')
        
        async def send_data():
            """
            Asynchronous function used for sending data
            """
            while True:
                try:
                    data = audio_stream.read(CHUNK, exception_on_overflow = False)
                    data = base64.b64encode(data).decode('utf-8')
                    await ws_connection.send(json.dumps({'audio_data': str(data)}))
                except Exception as e:
                    print(f'Something went wrong. Error code was {e}')
                    break
                await asyncio.sleep(0.1)
            return True
       
        async def receive_data():
            """
            Asynchronous function used for receiving data
            """
            while True:
                try:
                    received_msg = await ws_connection.recv()
                    print(json.loads(received_msg)['text'])
                except Exception as e:
                    print(f'Something went wrong. Error code was {e}')
                    break
                    
        data_sent, data_received = await asyncio.gather(send_data(), receive_data())

asyncio.run(speech_to_text())