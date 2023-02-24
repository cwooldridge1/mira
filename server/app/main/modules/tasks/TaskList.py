
from pydantic import BaseModel
from typing import Optional, List
from .TaskService import TaskService

class Task(BaseModel):
  id: str
  title: str
  updated: str
  status: Optional[str] #"needsAction" or "completed"
  due: str = None
  deleted: bool = False



class TaskList:
    def __init__(self, id: str, title: str):
        self.id =id
        self.title = title


    def addTask(self, title:str, due=None) -> None:
        #https://developers.google.com/tasks/reference/rest/v1/tasks
        task = {
            'title': title
        }
        if due:
            task['due'] = due

        TaskService.tasks().insert(tasklist=self.id, body=task).execute()


    def markTaskComplete(self, title:str):
        task = self.getTask(title)
        task.status = 'completed'
        TaskService.tasks().update(tasklist=self.id, task=task.id, body=task.dict()).execute()


    def deleteTask(self, title:str):
        task = self.getTask(title)
        TaskService.tasks().delete(tasklist=self.id, task=task.id).execute()


    def getTasks(self) -> List[Task]: 
        return [Task.parse_obj(task) for task in TaskService.tasks().list(tasklist=self.id).execute()['items']]


    def getTask(self, title:str) -> Task:
        '''
        method is not case sensitive
        '''
        tasks = self.getTasks()
        title = title.lower()
        for task in tasks:
            if task.title.lower() == title:
                return task
        raise ValueError(f'No task with title "{title}" found')
