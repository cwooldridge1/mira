from .Command import Command
from ....types.responses import ContentResponse
from ..OpenAI import OpenAI

class FallbackCommand(Command):

    def handle(self, prompt):
        '''
        Gets the code
        '''
        try:
            answer = OpenAI.ask(prompt)
        except IOError:
            super().fail()
        else:
            resp = ContentResponse(type='text', data={'text':f'{prompt}:\n {answer}'})
            super().output(resp)