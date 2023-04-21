from .Command import Command
from ....types.responses import PopupResponse
from ....types.orders import MarketOrder


class PlaceMarketOrderCommand(Command):
    def __init__(self, symbol: str, qty: int) -> None:
        self.symbol = symbol
        self.qty = qty

    def execute(self) -> None:
        pass

    def getSocketResponse(self) -> PopupResponse:
        payload = MarketOrder(symbol=self.symbol, qty=self.qty, side='buy')

        return PopupResponse(type='tradeConfirmation', data=payload)
