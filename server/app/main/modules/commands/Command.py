from abc import abstractmethod
from ..MatchCommand import MatchCommand
from ..Audio import Audio
from ....types.responses import ContentResponse
from multiprocessing import Queue
from ...metaclasses import MethodExceptionHandler

class Command(metaclass=MethodExceptionHandler):
    '''
    This class is a base class for commands and every command
    '''
    def __init__(self, messageQueue:Queue):
        self.messageQueue = messageQueue

    @abstractmethod
    def handle(self, prompt):
        '''
        Used to handle a command and create a response. Must call the output method
        '''
        pass

    def output(self, resp: ContentResponse):
        '''
        Adds a response to the message queue so that the socket can emit it
        '''
        self.messageQueue.put(resp)

    def getSimilarity(self, prompt) -> float:
        '''
        Used to fin dthe similarity between a text command and the commands that are associated to this class instance
        '''
        #find the simualrities between the input command and the commands associated with this command
        similarities = MatchCommand.getSimilarities(prompt, self.commands)
        #find the max similarity between the input command and the commands associated with this command
        return max(similarities)

    def fail(self) -> None:
        Audio.output("Sorry can you try that again?")
