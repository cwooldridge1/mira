from .. import sio, orders
from .modules.Trades import Trades
from concurrent.futures import ThreadPoolExecutor, as_completed
from .modules.Trades import Trades


def tradeExecutionListener():
    while True:
        if len(orders):
            with ThreadPoolExecutor() as executor:
                results = [executor.submit(Trades.getOrder, oid=order) for order in orders]
                for result in as_completed(results):
                    result = result.result()
                    if result.status == 'filled':
                        #emit and remove id
                        del orders[result.id]
                        sio.emit('trade-execution', result._raw) #._raw is the raw json data
        sio.sleep(5)          