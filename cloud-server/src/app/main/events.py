from .. import sio

@sio.on('connect')
def handle_connect():
    print('Client connected')

@sio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')
