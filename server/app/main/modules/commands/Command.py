from abc import ABC, abstractmethod
from ..MatchCommand import MatchCommand
from ..Audio import Audio
from ....types.responses import ContentResponse
from multiprocessing import Queue

class Command(ABC):
    '''
    This class is a base class for commands and every command
    '''
    def __init__(self, messageQueue:Queue):
        self.messageQueue = messageQueue

    @abstractmethod
    def handle(self, text):
        '''
        Used to handle a command and create a response. Must call the output method
        :param text: the text command you want to be handled
        '''
        pass

    def output(self, resp: ContentResponse):
        '''
        Adds a response to the message queue so that the socket can emit it
        '''
        self.messageQueue.put(resp)

    def getSimilarity(self, text) -> float:
        '''
        Used to fin dthe similarity between a text command and the commands that are associated to this class instance
        :param text: the text command you wish to match against
        '''
        #find the simualrities between the input command and the commands associated with this command
        similarities = MatchCommand.getSimilarities(text[:max([len(command) for command in self.commands])], self.commands)
        #find the max similarity between the input command and the commands associated with this command
        return max(similarities), self.handle

    def fail(self) -> None:
        #TODO catagorize the failure
        Audio.output("Sorry can you try that again?")
        return {
           'status': 400,
            'route': 'fail',
            'payload': {'content': 'Requested failed'}
        }
