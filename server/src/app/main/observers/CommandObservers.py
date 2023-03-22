from . import TranscriptObserver
from ..modules.commands import Command
from typing import List
import re 

class CommandObserver(TranscriptObserver):
    def __init__(self, commands: List[Command], fallbackCommand: Command):
        self.__commands = commands
        self.__fallbackCommand = fallbackCommand
        self.__WAKE = 'hey mira'
    
    def onTranscriptEnd(self, transcript):
        prompt = re.sub(r'[^a-zA-Z0-9\s]','',transcript).lower()
        if prompt.count(self.__WAKE) > 0:
            prompt = prompt[len(self.__WAKE)+1:]

            command = self.getBestCommand(prompt)
            command.handle(prompt)
            print(prompt, command)

    def getBestCommand(self, prompt) -> Command:
        commandConfidences = [command.getSimilarity(prompt) for command in self.__commands]

        bestConfidence = 0.4
        bestConfidenceIndex = -1 
        for i, confidence in enumerate(commandConfidences):
            if confidence > bestConfidence:
                bestConfidenceIndex, bestConfidence = i, confidence
                
        return self.__fallbackCommand if bestConfidenceIndex == -1 else self.__commands[bestConfidenceIndex]
        