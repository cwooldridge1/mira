from unittest import TestCase
from app.main.modules.tasks import Tasks


TASK_LIST_TITLE = 'test'
TASK_NAME = 'Test'


class TaskTests(TestCase):

    run_tests = True

    @classmethod
    def setUpClass(cls):
        # code to run once when the class is loaded
        try:
            taskList = Tasks.getTaskList(TASK_LIST_TITLE)
            Tasks.deleteTaskList(taskList.title)
        except Exception as e:
            print(e)

    def setUp(self):
        if not self.run_tests:
            self.skipTest("Previous test failed")

    def tearDown(self):
        self.run_tests = True

    def test_1_add_task_list(self):
        Tasks.addTaskList(TASK_LIST_TITLE)

        # will raise value error if not found
        Tasks.getTaskList(TASK_LIST_TITLE)

    def test_2_add_task(self):
        taskList = Tasks.getTaskList(TASK_LIST_TITLE)
        taskList.addTask(TASK_NAME)

        # will raise value error if no found
        taskList.getTask(TASK_NAME)

        self.assertEqual(1, len(taskList.getTasks()))

    def test_3_delete_task(self):
        taskList = Tasks.getTaskList(TASK_LIST_TITLE)
        taskList.deleteTask(TASK_NAME)

        self.assertRaises(ValueError, taskList.getTask, TASK_NAME)

        self.assertEqual(0, len(taskList.getTasks()))

    def test_4_delete_task_llst(self):
        Tasks.deleteTaskList(TASK_LIST_TITLE)

        self.assertRaises(ValueError, Tasks.getTaskList, 'this is a test task')
