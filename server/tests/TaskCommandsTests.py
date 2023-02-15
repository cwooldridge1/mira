from tests.__init__ import CommandTest

TASK_1_NAME = 'take out trash'
TASK_2_NAME = 'clean dishes'
TASK_3_NAME = 'read book'
class TaskCommandTests(CommandTest):

    def test_1_add_task(self):
        self.assertPromptWillAddTask(f'add task for {TASK_1_NAME}', TASK_1_NAME)
        self.assertPromptWillAddTask(f'append task to {TASK_2_NAME} ', TASK_2_NAME)
        self.assertPromptWillAddTask(f'create task for {TASK_3_NAME}', TASK_3_NAME)


    def test_2_get_tasks(self):
        
        for prompt in  ['show me my tasks', 'read me my tasks', 'what tasks do I have today', 'pull up my tasks', 'Do I have any tasks to do today']:
            self.assertPromptWillGetTasks(prompt)


    def test_3_delete_task(self):
        self.assertPromptWillDeleteTask(f'delete task {TASK_1_NAME}', TASK_1_NAME)
        self.assertPromptWillDeleteTask(f'remove task to {TASK_2_NAME}', TASK_2_NAME)

    


