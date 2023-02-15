from unittest import TestCase

from collections import deque
from typing import List

from app.main.modules.Listener import Listener
from app.main.modules.commands import ChartCommand, CodeCommand, FallbackCommand, Command, GetTasksCommand, AddTaskCommand, DeleteTaskCommand, CompleteTaskCommand
from app.types.responses import ContentResponse

from app.main.modules.tasks import Tasks, Task

from os import environ




TASK_LIST_NAME = environ.get('DEFAULT_GOOGLE_TASK_LIST')

class MockQueue:
    '''
    The Multiproccess queue does not work well with the test so this a mock queue that gives the basic needed functions the Queue provides
    '''
    def __init__(self):
        self.__q = deque()

    def put(self, item: ContentResponse):

        self.__q.append(item)

    def get(self) -> ContentResponse:
        '''Get item from front of queue and removes it'''
        if self.__q:
            return self.__q.popleft()
        return None

class CommandTest(TestCase):


    def __init__(self, *args, **kwargs) -> None:
        '''
        Subclass to help supprt testing Commands by providing a listener object that emulates the one in the app with the exception that the listener is never
        turned on and there is no background tasks that emit messages from the queue
        '''
        super().__init__(*args, **kwargs)
        self.messageQueue = MockQueue()
        self.listener= Listener(FallbackCommand(messageQueue=self.messageQueue)) # gives the listener a special command to fall back on if the command is not understood
        self.listener.addCommand(ChartCommand(messageQueue=self.messageQueue))
        self.listener.addCommand(CodeCommand(messageQueue=self.messageQueue))
        self.listener.addCommand(AddTaskCommand(messageQueue=self.messageQueue))
        self.listener.addCommand(GetTasksCommand(messageQueue=self.messageQueue))
        self.listener.addCommand(DeleteTaskCommand(messageQueue=self.messageQueue))
        self.listener.addCommand(CompleteTaskCommand(messageQueue=self.messageQueue))

        try:
            self.taskList = Tasks.getTaskList(TASK_LIST_NAME)
        except:
            Tasks.addTaskList(TASK_LIST_NAME)
            self.taskList = Tasks.getTaskList(TASK_LIST_NAME)

    def assertBestCommand(self, prompt:str, expectedCommandType:Command):
        command = self.listener.getBestCommand(prompt)
        assert isinstance(command, expectedCommandType), f'Expected {type(expectedCommandType)} but got type {type(command)}'

    
    
    def assertPromptWillAddTask(self, prompt, expectedtaskTitle):
        command = self.listener.getBestCommand(prompt)
        self.assertTrue(isinstance(command, AddTaskCommand))

        command.handle(prompt)
        
        self.taskList.getTask(expectedtaskTitle)

        tasks: List[Task] = self.messageQueue.get().data['tasks']
        
        self.assertIn(expectedtaskTitle, [task.title for task in tasks])


    def assertPromptWillDeleteTask(self, prompt, expectedtaskTitle):
        command = self.listener.getBestCommand(prompt)
        self.assertTrue(isinstance(command, DeleteTaskCommand))

        command.handle(prompt)
        self.assertRaises(ValueError, self.taskList.getTask, expectedtaskTitle)

        tasks: List[Task] = self.messageQueue.get().data['tasks']
        self.assertNotIn(expectedtaskTitle, [task.title for task in tasks])


    def assertPromptWillGetTasks(self, prompt):
        command = self.listener.getBestCommand(prompt)
        # print(prompt, command)
        self.assertTrue(isinstance(command, GetTasksCommand))

        command.handle(prompt)

        expectedTasks = [task.title for task in self.taskList.getTasks()]
        actualTasks = [task.title for task in self.messageQueue.get().data['tasks']]

        self.assertCountEqual(expectedTasks, actualTasks)


    def assertPromptWillCompleteTask(self, prompt, expectedtaskTitle):
        command = self.listener.getBestCommand(prompt)
        self.assertTrue(isinstance(command, CompleteTaskCommand))

        command.handle(prompt)
        self.assertRaises(ValueError, self.taskList.getTask, expectedtaskTitle)

        tasks: List[Task] = self.messageQueue.get().data['tasks']
        self.assertNotIn(expectedtaskTitle, [task.title for task in tasks])


    def tearDown(self) -> None:
        self.messageQueue.get()


    @classmethod
    def tearDownClass(cls) -> None:
        Tasks.deleteTaskList(TASK_LIST_NAME)
        return super().tearDownClass()


        



