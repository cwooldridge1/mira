from os import environ, path
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build, Resource
from pydantic import BaseModel
from typing import List, Optional

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/tasks']


class TaskService:

    __service = None
    __credentials = None

    @classmethod
    def _getCredentials(cls):
        credentials = cls.__credentials

        # The file token.json stores the user's access and refresh tokens, and is
        # created automatically when the authorization flow completes for the first
        # time.
        if path.exists('token.json'):
            credentials = Credentials.from_authorized_user_file('token.json', SCOPES)
        # If there are no (valid) credentials available, let the user log in.
        if not credentials or not credentials.valid:
            if credentials and credentials.expired and credentials.refresh_token:
                credentials.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    'credentials.json', SCOPES)
                credentials = flow.run_local_server(port=0)
            # Save the credentials for the next run
            with open('token.json', 'w') as token:
                token.write(credentials.to_json())
        cls.__credentials = credentials
        
        return credentials

    @classmethod
    def getService(cls) -> Resource:

        if cls.__service and cls.__credentials.valid:
            return cls.__service

        credentials = cls._getCredentials()
        cls.__service = build('tasks', 'v1', credentials=credentials)

        return cls.__service

    @classmethod
    def tasks(cls) -> Resource:
        return cls.getService().tasks()

    @classmethod
    def taskLists(cls) -> Resource:
        return cls.getService().tasklists()


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


    def addTask(self, title, due=None) -> None:
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


    def getTask(self, title) -> Task:
        tasks = self.getTasks()
        for task in tasks:
            if task.title == title:
                return task
        raise ValueError(f'No task with title "{title}" found')



class Tasks:
    @staticmethod
    def addTaskList(title) -> None:
        #https://developers.google.com/tasks/reference/rest/v1/tasklists
        taskList = {
            'title': title
        }

        TaskService.taskLists().insert(body=taskList).execute()


    @staticmethod
    def getTaskList(title:str = environ.get('DEFAULT_GOOGLE_TASK_LIST')) -> TaskList:
        taskLists = TaskService.taskLists().list().execute().get('items', [])
        for taskList in taskLists:
            if taskList['title'] == title:
                return TaskList(id=taskList['id'], title=taskList['title'])

        raise ValueError("Task list not found")


    @staticmethod
    def deleteTaskListById(id:str):
        TaskService.taskLists().delete(tasklist=id).execute()


    @staticmethod
    def deleteTaskList(title):
        id = Tasks.getTaskList(title).id
        Tasks.deleteTaskListById(id)


if __name__ == "__main__":
    taskList = Tasks.getTaskList('My Tasks')
    # taskList.addTask('My Task')
    # taskList.markTaskComplete('My Task')
    taskList.getTasks()
