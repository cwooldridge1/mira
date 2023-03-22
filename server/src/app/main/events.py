from .. import sio
from .subjects import transcriptSubject

@sio.on('connect')
def connect():
    print('Client connected')

@sio.on('transcript')
def onTranscript(data):
    transcriptSubject.onTranscriptReceived(data)

@sio.on('disconnect')
def disconnect():
    print('Client disconnected')
