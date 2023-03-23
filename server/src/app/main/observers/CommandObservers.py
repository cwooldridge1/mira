from . import TranscriptObserver
from ..modules.commands import Command
from typing import List
from ...types.responses import SocketResponse
from flask_socketio import SocketIO
import re 

class CommandObserver(TranscriptObserver):
    def __init__(self, commands: List[Command], fallbackCommand: Command, sio: SocketIO):
        self.__commands = commands
        self.__fallbackCommand = fallbackCommand
        self.__WAKE = 'hey mira'
        self.sio = sio
        self.isWoken = False

    def formatTranscript(self, transcript:str):
        return re.sub(r'[^a-zA-Z0-9\s]','',transcript).lower()

    def transcriptHasWakeupCommand(self, transcript:str):
        return transcript.count(self.__WAKE) > 0

    def onTranscriptReceived(self, transcript:str):
        '''
        use to let the client know that the server is listening if we havent already
        '''
        if not self.isWoken:
            transcript = self.formatTranscript(transcript)

            if self.transcriptHasWakeupCommand(transcript):
                resp =  SocketResponse(
                    type='wake',
                    status =200,
                    data= {},
                    event= 'wake'
                )
                self.sio.emit(resp.event, resp)
                self.isWoken = True

    
    def onTranscriptEnd(self, transcript:str):
        if self.isWoken:
            try:
                loadingResp =  SocketResponse(
                    type='loading-response',
                    status =200,
                    data= {},
                    event= 'loading-response'
                )
                self.sio.emit(loadingResp.event, loadingResp)

                transcript = self.formatTranscript(transcript)
                prompt = transcript[len(self.__WAKE)+1:]

                command = self.getBestCommand(prompt)
                command.handle(prompt)
            except Exception as e:
                print(e)

            self.isWoken = False


    def getBestCommand(self, prompt:str) -> Command:
        commandConfidences = [command.getSimilarity(prompt) for command in self.__commands]

        bestConfidence = 0.4
        bestConfidenceIndex = -1 
        for i, confidence in enumerate(commandConfidences):
            if confidence > bestConfidence:
                bestConfidenceIndex, bestConfidence = i, confidence
                
        return self.__fallbackCommand if bestConfidenceIndex == -1 else self.__commands[bestConfidenceIndex]
        