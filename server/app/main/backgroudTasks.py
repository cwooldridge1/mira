
from .. import sio, messageQueue
def messageEmitter():
    '''
    background task to emit messages sent from other proceesses
    '''
    while True:
        if not messageQueue.empty():
            message = messageQueue.get()
            print(message.dict())
            sio.emit('content', message)
        sio.sleep(0.1)           