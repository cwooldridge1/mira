import socketio
import eventlet
import socketio
from multiprocessing import Queue, Process
sio = socketio.Server(async_handlers=True, cors_allowed_origins='*')
app = socketio.WSGIApp(sio)

@sio.event
def connect(sid, environ):
    print('connect ', sid)

@sio.on('init')
def my_message(sid, data):
    sio.emit('init', sid)

@sio.event
def disconnect(sid):
    print('disconnect ', sid)

def backgroundTask(queue:Queue):
    while True:
        if not queue.empty():
            route, payload = queue.get()
            print(route, payload)
            sio.emit(route, payload)
        sio.sleep(0.1)            

if __name__ == '__main__':
    from commands import Chart
    from Listener import Listener
    listener:Listener = Listener()
    listener.addCommand(Chart())
    queue = Queue()
    receiveProcess = Process(target=listener.run, args=(queue,))
    receiveProcess.start()
    sio.start_background_task(backgroundTask, queue)
    eventlet.wsgi.server(eventlet.listen(('localhost', 8080)), app)

