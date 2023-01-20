
from .. import sio

@sio.event
def connect(sid, environ):
    print('connect ', sid)

@sio.on('init')
def my_message(sid, data):
    sio.emit('init', sid)

@sio.event
def disconnect(sid):
    print('disconnect ', sid)