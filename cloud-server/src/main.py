import select #THIS IS NEEDED DO NOT DELETE OR YOU WILL GET ERROR
import eventlet
eventlet.monkey_patch()


from app import createApp

app = createApp()

if __name__ == '__main__':
    # Use the eventlet WSGI server
    eventlet.wsgi.server(eventlet.listen(('localhost', 5001)), app)
