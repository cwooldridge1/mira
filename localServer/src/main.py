import select #DO NOT DELETE IMOPRT IT IS ACTUALLY NEEDED
import eventlet


if __name__ == '__main__':
    from app import createApp
    app = createApp()
    eventlet.wsgi.server(eventlet.listen(('localhost', 8080)), app)

