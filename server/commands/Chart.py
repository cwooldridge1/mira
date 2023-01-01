from .Command import Command
from Audio import Audio
class Chart(Command):
    commands = ['Display a graph', 'Present a plot', 'Show a chart', 'Display a table', 'Bring up a graph', 'Show a plot', 'Present a chart', 'Bring up a table', 'Display a graph', 'Present a plot', 'Show a chart', 'Bring up a graph', 'Show a plot', 'pull up chart']
    def handle(self, text):
        '''

        '''
        text = text.split('of')
        if len(text) == 1:
            Audio.output('What ticker do you want to display?')
            ticker = Audio.input().upper()
        else:
            ticker = text[1].upper()
        Audio.output(f'Sure ill pull up a chart of {ticker}')
        return super().output(200, 'content', {'type':'chart', 'props': {'ticker': ticker}})