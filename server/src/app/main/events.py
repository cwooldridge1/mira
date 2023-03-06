from .. import sio

@sio.on('connect')
def connect():
    print('Client connected')

@sio.on('disconnect')
def disconnect():
    print('Client disconnected')
