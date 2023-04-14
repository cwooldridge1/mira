from abc import ABC, abstractmethod
from app.types.responses import SocketResponse
from typing import Any


class Command(ABC):
    @abstractmethod
    def execute(self) -> Any:
        ...

    @abstractmethod
    def getSocketResponse(self) -> SocketResponse:
        ...
