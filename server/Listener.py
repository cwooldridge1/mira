import traceback
from Audio import Audio
from commands import Command
from typing import List
from threading import Thread
# from serversocket import send
# from socketserver import send 
import json
from multiprocessing import Queue

class Listener():
    def __init__(self):
        super(Listener, self).__init__()
        self.__WAKE = 'hey mira'
        self.__commands: List[Command] = list()
        

    def addCommand(self, command: Command) -> None:
        self.__commands.append(command)
    def run(self, q:Queue):
        while True:
            try:
                text:str = Audio.input()
                if text.count(self.__WAKE) > 0:
                    text = text[len(self.__WAKE)+1:]
                    func = self.bestCommand(text)
                    if func is not None: 
                        res = func(text)
                        q.put((res['route'], res['payload']))

                    else:
                        Audio.output('Sorry I did not recognize that command')
            except Exception:
                traceback.print_exc()

    def bestCommand(self, text):
        commands = [command.getSimilarity(text) for command in self.__commands]
        best = (0.4, None)
        for confidence, func in commands:
            if confidence >= best[0]:
                best = (confidence, func)
        print(commands, best)
        return best[1]