from .Command import Command
from ....types.responses import PopupResponse
from ....types.orders import MarketOrder


class PlaceMarketOrderCommand(Command):
    def __init__(self, symbol: str, side: str, qty: str) -> None:
        self.symbol = symbol
        self.side = side
        self.qty = int(qty)

    def execute(self) -> None:
        pass

    def getSocketResponse(self) -> PopupResponse:
        payload = MarketOrder(symbol=self.symbol, qty=self.qty, side=self.side)

        return PopupResponse(type='tradeConfirmation', data=payload)
