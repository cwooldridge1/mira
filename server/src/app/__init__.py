
from dotenv import load_dotenv
load_dotenv()
from .main.observers.CommandObservers import CommandObserver
from .types.encoders import JSONWrapper, CustomJSONEncoder
from typing import Dict
from alpaca_trade_api.entity import Order
from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS


orders: Dict[str, Order] = dict()

sio = SocketIO(cors_allowed_origins='*', json=JSONWrapper)


def createApp():
    app = Flask(__name__)
    app.json_encoder = CustomJSONEncoder
    CORS(app)

    # register blueprints
    registerBlueprints(app)
    # init SIO
    sio.init_app(app)
    # init application extensions
    initializeExtensions()
    initializeObservers()

    from .main import events
    return app


def initializeObservers():
    from .main.subjects import transcriptSubject

    transcriptSubject.registerObserver(CommandObserver(sio))


def registerBlueprints(app: Flask):
    from .main.blueprints.tradeRoutes import tradeRoutes
    from .main.blueprints.generalRoutes import generalRoutes
    app.register_blueprint(tradeRoutes)
    app.register_blueprint(generalRoutes)


def initializeExtensions():
    # init background tasks
    from .main.backgroundTasks import tradeExecutionListener
    sio.start_background_task(tradeExecutionListener)
