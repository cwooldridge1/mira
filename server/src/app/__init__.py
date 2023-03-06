from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
from dotenv import load_dotenv
from alpaca_trade_api.entity import Order
from typing import Dict
from .types.encoders import JSONWrapper, CustomJSONEncoder
load_dotenv()

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
    from .main import events
    return app

def registerBlueprints(app:Flask):
    from .main.blueprints.tradeRoutes import tradeRoutes
    app.register_blueprint(tradeRoutes)

def initializeExtensions():
    #init background tasks
    from .main.backgroundTasks import tradeExecutionListener
    sio.start_background_task(tradeExecutionListener)
