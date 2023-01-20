from .Command import Command
from ..Audio import Audio
from ....types.responses import ContentResponse
class Chart(Command):
    commands = ['Display a graph', 'Present a plot', 'Show a chart', 'Display a table', 'Bring up a graph', 'Show a plot', 'Present a chart', 'Bring up a table', 'Display a graph', 'Present a plot', 'Show a chart', 'Bring up a graph', 'Show a plot', 'pull up chart']
    def handle(self, text):
        '''
        Finds the ticker symbol in a text else asks the user for a ticker symbol and calls the output method with the ticker and the type being 'chart'
        '''
        text = text.split('of')
        if len(text) == 1:
            Audio.output('What ticker do you want to display?')
            ticker = Audio.input().upper()
        else:
            ticker = text[1].upper()
        Audio.output(f'Sure ill pull up a chart of {ticker}')
        resp = ContentResponse(type='chart', data={'ticker': ticker})
        super().output(resp)