interface InitialState {
  transcripts: String[];
  audio: any[];
  serverIsListening: boolean;
  serverIsLoadingResponse: boolean;
}
const AudioAction: string = 'AUDIO';

export default InitialState;
export { AudioAction };
