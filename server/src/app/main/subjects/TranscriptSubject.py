from ...types.datastructures import CircularBuffer
from typing import List
from ..observers import TranscriptObserver

class TranscriptSubject:
    def __init__(self):
        self._observers:List[TranscriptObserver] = []
        self.transcripts = CircularBuffer(size=100)
        self.isTalking = False

    def registerObserver(self, observer: TranscriptObserver):
        self._observers.append(observer)

    def notifyObservers(self, data, method):
        for observer in self._observers:
            try:
                getattr(observer, method)(data)
            except Exception as e:
                print(e)


    def onTranscriptReceived(self, transcript: str):
        self.notifyObservers(transcript, 'onTranscriptReceived') 

        if not self.isTalking and len(transcript):
            self.isTalking = True
            self.onTranscriptStart(transcript)
        
        #user has stopped talking for 2 beats 
        if self.isTalking and not len(transcript) and not len(self.transcripts[-1]):
            self.isTalking = False
            self.onTranscriptEnd(self.transcripts[-2]) #send the last transcript

        self.transcripts.append(transcript)

    def onTranscriptEnd(self, transcript:str):
        self.notifyObservers(transcript, 'onTranscriptEnd') 

    def onTranscriptStart(self, transcript: str):
        self.notifyObservers(transcript, 'onTranscriptStart') 