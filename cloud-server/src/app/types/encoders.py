
import json
from .responses import SocketResponse

class CustomJSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, SocketResponse):
            return o.dict()
        return super().default(self, o)

        
class JSONWrapper(object):
    @staticmethod
    def dumps(*args, **kwargs):
        if 'cls' not in kwargs:
            kwargs['cls'] = CustomJSONEncoder
        return json.dumps(*args, **kwargs)

    @staticmethod
    def loads(*args, **kwargs):
        return json.loads(*args, **kwargs)
