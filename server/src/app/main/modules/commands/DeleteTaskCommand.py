from .Command import Command
from app.main.constants import TASK_LIST
from app.types.responses import TasksResponse
        
class DeleteTaskCommand(Command):
    def __init__(self, taskTitle:str):
        self.taskTitle = taskTitle

    def execute(self) -> None:
        TASK_LIST.deleteTask(self.taskTitle)

    def getSocketResponse(self) -> float:
        self.execute()
        tasks = TASK_LIST.getTasks()

        return  TasksResponse(data={'tasks': tasks})