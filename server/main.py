import select
import eventlet
eventlet.monkey_patch()

if __name__ == '__main__':
    from app import createApp
    app = createApp()
    eventlet.wsgi.server(eventlet.listen(('localhost', 8080)), app)

