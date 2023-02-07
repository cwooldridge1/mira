from tests.__init__ import CommandTest
from app.main.modules.Tasks import Task
from typing import List



class TaskCommandTests(CommandTest):

    def test_1_add_task(self):
        self.assertPromptWillAddTask('add task for take out trash', 'take out trash')
        self.assertPromptWillAddTask('append task to clean dishes', 'clean dishes')
        self.assertPromptWillAddTask('create task for read book', 'read book')

    def test_2_get_tasks(self):
        
        for prompt in  ['show me my tasks', 'read me my tasks', 'what tasks do I have today', 'pull up my tasks', 'Do I have anything to do today']:
            self.assertPromptWillGetTasks(prompt)


    



