from flask import Blueprint, request, jsonify
import requests

from ..modules.Trades import Trades
from  ...types.orders import MarketOrder

generalRoutes = Blueprint('generalRoutes',  __name__, url_prefix='/')


@generalRoutes.route('/assembly-token', methods=['GET'])
def getAssemblyToken():
    try:
        response = requests.post(
            'https://api.assemblyai.com/v2/realtime/token', # use account token to get a temp user token
            json={'expires_in': 3600}, # can set a TTL timer in seconds.
            headers={'authorization': '204c82e7f22e4f5fb5117a5b70c6ddd9'} # AssemblyAI API Key goes here
        )
        response.raise_for_status() # raise an exception for 4xx/5xx errors
        data = response.json()
        return jsonify(data)
    except requests.exceptions.HTTPError as err:
        status_code = err.response.status_code
        error_message = err.response.text
        return jsonify(error=error_message), status_code