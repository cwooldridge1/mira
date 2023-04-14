from .Command import Command
from ....types.responses import ContentResponse


class ChartCommand(Command):
    def __init__(self, ticker) -> None:
        self.ticker = ticker

    def execute(self) -> None:
        pass

    def getSocketResponse(self) -> ContentResponse:
        return ContentResponse(type='chart', data={'ticker': self.ticker})
