from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv()
from alpaca_trade_api.entity import Order
from typing import Dict
from .types.encoders import JSONWrapper, CustomJSONEncoder
from .main.observers.CommandObservers import CommandObserver

orders: Dict[str, Order] = dict()

sio = SocketIO(cors_allowed_origins='*', json=JSONWrapper)
def createApp():
    app = Flask(__name__)
    app.json_encoder = CustomJSONEncoder
    CORS(app)

    #register blueprints
    registerBlueprints(app)
    #init SIO
    sio.init_app(app)
    #init application extensions
    initializeExtensions()
    initializeObservers()

    from .main import events
    return app


def createCommandObserver()-> CommandObserver:
    '''
    This function gives commands to a listener object that matches voice commands to a given command that is registed with the listener
    '''
    from .main.modules.commands import ChartCommand, CodeCommand, FallbackCommand, AddTaskCommand, DeleteTaskCommand, GetTasksCommand

    commands = [command(sio) for command in [ChartCommand, CodeCommand, AddTaskCommand, DeleteTaskCommand, GetTasksCommand]]

    return CommandObserver(commands = commands, fallbackCommand = FallbackCommand(sio), sio = sio) 


def initializeObservers():
    from .main.subjects import transcriptSubject

    transcriptSubject.registerObserver(createCommandObserver())


def registerBlueprints(app:Flask):
    from .main.blueprints.tradeRoutes import tradeRoutes
    from .main.blueprints.generalRoutes import generalRoutes
    app.register_blueprint(tradeRoutes)
    app.register_blueprint(generalRoutes)


def initializeExtensions():
    #init background tasks
    from .main.backgroundTasks import tradeExecutionListener
    sio.start_background_task(tradeExecutionListener)
