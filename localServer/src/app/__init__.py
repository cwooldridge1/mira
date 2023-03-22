
from dotenv import load_dotenv
load_dotenv()
import socketio
from flask_socketio import SocketIO
import socketio
from flask import Flask
from flask_cors import CORS
from multiprocessing import Queue, Process
from .types.encoders import JSONWrapper, CustomJSONEncoder
from .main.modules.Listener import Listener
# sio = socketio.Server(async_handlers=True, cors_allowed_origins='*', json=JSONWrapper)
sio = SocketIO(cors_allowed_origins='*', json=JSONWrapper)
messageQueue = Queue()


def createApp():
    app = Flask(__name__)
    app.json_encoder = CustomJSONEncoder
    CORS(app)

    #init SIO
    sio.init_app(app)
    import app.main.events
    # app = socketio.WSGIApp(sio)
    #configure app
    startVoiceCommandListener(createVoiceCommandListener())
    configureBackgroundTasks()
    return app


def createVoiceCommandListener()-> Listener:
    '''
    This function gives commands to a listener object that matches voice commands to a given command that is registed with the listener
    '''
    from .main.modules.commands import ChartCommand, CodeCommand, FallbackCommand, AddTaskCommand, DeleteTaskCommand, GetTasksCommand
    listener= Listener(FallbackCommand(messageQueue=messageQueue)) # gives the listener a special command to fall back on if the command is not understood
    listener.addCommand(ChartCommand(messageQueue=messageQueue))
    listener.addCommand(CodeCommand(messageQueue=messageQueue))
    listener.addCommand(AddTaskCommand(messageQueue=messageQueue))
    listener.addCommand(DeleteTaskCommand(messageQueue=messageQueue))
    listener.addCommand(GetTasksCommand(messageQueue=messageQueue))

    return listener

def startVoiceCommandListener(listener:Listener)->None:
    '''
    This function starts the listener object on a differnt proccess as socket.io and the listener cannot run on one core
    :param listener: Is a configured listener object
    '''
    receiveProcess = Process(target=listener.run)
    receiveProcess.start()

def configureBackgroundTasks():
    '''
    This function is to configure all background tasks to run in the SIO application
    '''
    from .main.backgroundTasks import messageEmitter, listener
    sio.start_background_task(messageEmitter)
    sio.start_background_task(listener)