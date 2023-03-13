from os import environ
from .TaskList import TaskList
from .TaskService import TaskService





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

