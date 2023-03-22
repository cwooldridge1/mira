from ...types.datastructures import CircularBuffer
from typing import List
from abc import ABC

class TranscriptObserver(ABC):
    def onTranscriptReceived(self, transcript):
        # This method will be implemented by the observers
        pass

    def onTranscriptStart(self, transcript):
        pass

    def onTranscriptEnd(self, transcript):
        pass
