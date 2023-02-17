from ..Command import Command
from ...tasks import Tasks, Task
from app.types.responses import TasksResponse
from typing import List
from os import environ

TASK_LIST_NAME = environ.get('DEFAULT_GOOGLE_TASK_LIST')
class TaskCommand(Command):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)


        try:
            self.taskList = Tasks.getTaskList(TASK_LIST_NAME)
        except:
            Tasks.addTaskList(TASK_LIST_NAME)
            self.taskList = Tasks.getTaskList(TASK_LIST_NAME)

    def extractTaskTitle(self, prompt):
        prompt = prompt.split('task')
        if len(prompt) == 1:
            raise ValueError('Task name not found')
        
        taskTitle = prompt[-1].strip()

        #if the first word is 'for' then we need to trim this
        if taskTitle[:3] == 'for':
            taskTitle = taskTitle[4:] # 4 to also remove the space
        elif taskTitle[:2] == 'to':
            taskTitle = taskTitle[3:]


        return taskTitle

    def outputTasks(self, tasks: List[Task] = None):
        '''
        Function outputs the tasklist to the client. If tasks are not given then will pull tasks from the default list
        '''
        tasks = tasks if tasks else self.taskList.getTasks()

        resp =  TasksResponse(data={'tasks': tasks})
        super().output(resp)