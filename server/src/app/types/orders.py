from pydantic import BaseModel, validator
from abc import ABC



class OrderType(BaseModel, ABC):
    @validator('side')
    def sideValidator(side):
        if side not in ['buy','sell']:
            raise ValueError('side must be "buy" or "sell"')
        return side

    @validator('type')
    def orderTypeValidator(order):
        if order not in ['market', 'limit']:
            raise ValueError('order must be "market" or "limit"')
        return order

    @validator('time_in_force')
    def tifValidator(tif):
        if tif not in ['day', 'gtc', 'opg', 'cls', 'ioc', 'fok']:
            raise ValueError('tif must be "day", "gtc", "opg", "cls", "ioc", or "fok"')
        return tif

    symbol: str
    side: str
    type: str
    qty: int
    time_in_force: str = 'gtc'

class MarketOrder(OrderType):
    type: str = 'market'