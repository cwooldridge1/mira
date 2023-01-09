import alpaca_trade_api as tradeapi
from alpaca_trade_api.entity import Order, Position, Account
import os
from typing import Dict
from ... import orders
from ...types.orders import OrderType
from ... import sio
from ...types.responses import SocketResponse



def addorder(func):
    '''
    Decorator to add a new order
    '''
    def wrapper(*args, **kwargs):
        res = func(*args, **kwargs)
        orders[res.id] = res
        #emit to all client that an order was placed
        sio.emit('notification', SocketResponse(type='order-created', status=200, data=res._raw))
        return res
    return wrapper

class Trades(object):
    '''
    This class is used to interact with alpacas trade API
    '''

    API = tradeapi.REST(os.environ.get('ALPACA_KEY'), os.environ.get('ALPACA_SECRET_KEY'), base_url=os.environ.get('ALPACA_URL'))

    @staticmethod
    def getAccount() -> Account:
        '''
        Get account information
        '''
        return Trades.API.get_account()

    @staticmethod
    @addorder
    def placeTrade(order:OrderType) -> Order:
        '''
        Places an trade to be executed
        :param order: is the order you wish to place
        :return : The Order object associated with the placed order. Also appends the order to the orderq for execution notifications
        '''
        return Trades.API.submit_order(**order.dict())

    @staticmethod
    def getPosition(symbol:str) -> Position:
        '''
        Gets the position for the given symbol
        :param symbol: is the symbol you wish to get the position for
        :return : The Position object associated with the symbol
        '''
        return Trades.API.get_position(symbol=symbol)

    @staticmethod
    @addorder
    def closePosition(symbol:str) -> Order:
        '''
        Closes the position for the given symbol
        :param symbol: is the symbol you wish to close the position for
        :return : The Order object associated with the order to close the position
        '''
        return Trades.API.close_position(symbol=symbol)

    @staticmethod
    def getOpenOrders() -> Dict[str, Order]:
        '''
        Gets the open orders for the given symbol
        :return : a map of orders where the keys are the id of the order and the values are Order objects
        '''
        return {order.id: order for order in Trades.API.list_orders(status='open')}

    @staticmethod
    def getOrder(oid:str) -> Order:
        '''
        Gets the order with the given id
        '''
        return Trades.API.get_order(order_id=oid)
