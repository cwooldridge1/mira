
import json
from pydantic import BaseModel
class CustomJSONEncoder(json.JSONEncoder):
    def default(self, o):
        if issubclass(type(o), BaseModel):
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
