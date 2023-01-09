from pydantic import BaseModel

class SocketResponse(BaseModel):
    type: str
    status: int
    data: dict
    