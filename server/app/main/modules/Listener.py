import traceback
from .Audio import Audio
from .commands import Command
from typing import List
from os import environ

class Listener():
    def __init__(self, fallback:Command):
        super(Listener, self).__init__()
        self.__WAKE = 'hey mira'
        self.__commands: List[Command] = list()
        self.__fallback = fallback
        

    def addCommand(self, command: Command) -> None:
        self.__commands.append(command)


    def run(self):
        while True:
            try:
                prompt:str = Audio.input()

                if prompt.count(self.__WAKE) > 0:
                    prompt = prompt[len(self.__WAKE)+1:]

                    command = self.getBestCommand(prompt)
                    command.handle(prompt)

            except Exception:
                traceback.print_exc()


    def getBestCommand(self, prompt) -> Command:
        commandConfidences = [command.getSimilarity(prompt) for command in self.__commands]
        bestConfidence = float(environ.get('CONFIDENCE_THRESHOLD'))
        bestConfidenceIndex = -1 

        for i, confidence in enumerate(commandConfidences):
            if confidence > bestConfidence:
                bestConfidenceIndex, bestConfidence = i, confidence

        return self.__fallback if bestConfidenceIndex == -1 else self.__commands[bestConfidenceIndex]