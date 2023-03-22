import select #THIS IS NEEDED DO NOT DELETE OR YOU WILL GET ERROR
import eventlet
from os import environ 
eventlet.monkey_patch()


from app import createApp

app = createApp()

if __name__ == '__main__':
    # Use the eventlet WSGI server
    DOMAIN, PORT = ('localhost', 8080) if environ.get('ENV') == 'DEV' else ('0.0.0.0', 80)
    eventlet.wsgi.server(eventlet.listen((DOMAIN, PORT)), app)
