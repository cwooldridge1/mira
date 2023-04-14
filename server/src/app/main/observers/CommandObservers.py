from . import TranscriptObserver
from ..modules.commands import Command
from typing import List
from ...types.responses import SocketResponse, SocketErrorResponse
from flask_socketio import SocketIO
import re
from ..modules.GPTCommander import GPTCommander
from traceback import print_exc


class CommandObserver(TranscriptObserver):
    def __init__(self, sio: SocketIO):
        self.__WAKE = 'hey mira'
        self.sio = sio
        self.isWoken = False
        self.commander = GPTCommander()

    def formatTranscript(self, transcript: str):
        return re.sub(r'[^a-zA-Z0-9\s]', '', transcript).lower()

    def transcriptHasWakeCommand(self, transcript: str):
        return transcript.count(self.__WAKE) > 0

    def onTranscriptReceived(self, transcript: str):
        '''
        use to let the client know that the server is listening if we havent already
        '''
        if not self.isWoken:
            transcript = self.formatTranscript(transcript)

            if self.transcriptHasWakeCommand(transcript):
                resp = SocketResponse(
                    type='wake',
                    status=200,
                    data={},
                    event='wake'
                )
                self.sio.emit(resp.event, resp)
                self.isWoken = True

    def onTranscriptEnd(self, transcript: str):
        if self.isWoken:
            try:
                loadingResp = SocketResponse(
                    type='loading-response',
                    status=200,
                    data={},
                    event='loading-response'
                )
                self.sio.emit(loadingResp.event, loadingResp)

                transcript = self.formatTranscript(transcript)
                prompt = transcript[len(self.__WAKE)+1:]

                command = self.commander.getCommand(prompt)
                response = command.getSocketResponse()

                self.sio.emit(response.event, response)

            except Exception as e:
                print_exc()
                try:
                    resp = SocketErrorResponse()
                    self.sio.emit(resp.event, resp)
                except Exception as e:
                    print(e)

            self.isWoken = False
