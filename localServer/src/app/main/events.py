
from .. import sio
from .modules.tasks import Tasks
from ..types.responses import TasksResponse

TASK_LIST = Tasks.getTaskList()

@sio.event
def connect(sid, environ):
    print('connect ', sid)
    resp = TasksResponse(data={'tasks': TASK_LIST.getTasks()})
    sio.emit(resp.event, resp)

@sio.event
def disconnect(sid):
    print('disconnect ', sid)