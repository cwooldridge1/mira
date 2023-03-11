
from .. import sio, messageQueue
from ..types.responses import SocketResponse
def messageEmitter():
    '''
    background task to emit messages sent from other proceesses
    '''
    while True:
        if not messageQueue.empty():
            message:SocketResponse = messageQueue.get()
            sio.emit(message.event, message)
        sio.sleep(0.1)           