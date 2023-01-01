from abc import ABC, abstractmethod
from MatchCommand import MatchCommand
from Audio import Audio


class Command(ABC):
    '''
    This class is a base class for commands and every command
    '''
    @abstractmethod
    def handle(self, text):
        pass

    def output(self, status:int, route: str, payload: dict):
        return {
           'status': status,
            'route': route,
            'payload': payload
        }
    def getSimilarity(self, text) -> float:
        #find the simualrities between the input command and the commands associated with this command
        similarities = MatchCommand.getSimilarities(text, self.commands)
        #find the average similarity between the input command and the commands associated with this command
        return max(similarities), self.handle

    def fail(self, text) -> None:
        Audio.output("Sorry can you try that again?")
        #TODO catagorize the failure
