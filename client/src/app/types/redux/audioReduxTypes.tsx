interface InitialState {
  transcripts: String[];
  audio: any[];
  serverIsListening: boolean;
  serverIsLoadingResponse: boolean;
  serverErrorMsg: string | null;
}
const AudioAction: string = 'AUDIO';

export default InitialState;
export { AudioAction };
