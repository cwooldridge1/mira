from pydantic import BaseModel, Field
import time
from uuid import uuid4

    
class SocketResponse(BaseModel):
    type: str
    status: int
    data: dict
    time: float = Field(default_factory=lambda: time.time() *1000) #time in milliseconds
    id: str = Field(default_factory=lambda: str(uuid4()))
    event:str

class ErrorMsg(BaseModel):
    msg:str = 'An error occurred while processing the request'
class SocketErrorResponse(SocketResponse):
    type: str = 'error'
    status: int = 500
    event: str = 'error'
    data: ErrorMsg = ErrorMsg()

class ContentResponse(SocketResponse):
    event:str = 'content'
    status: int = 200 

class TasksResponse(SocketResponse):
    event:str = 'tasks'
    type:str = 'update'
    status: int = 200 
