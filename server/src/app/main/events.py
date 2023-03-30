from .. import sio, TASK_LIST
from .subjects import transcriptSubject
from .modules.tasks import Tasks
from ..types.responses import TasksResponse


@sio.on('connect')
def connect():
    resp = TasksResponse(data={'tasks': TASK_LIST.getTasks()})
    sio.emit(resp.event, resp)


@sio.on('transcript')
def onTranscript(data):
    transcriptSubject.onTranscriptReceived(data)


@sio.on('disconnect')
def disconnect():
    pass
