from .TaskCommand import TaskCommand
from ...Tasks import Tasks
from ...Audio import Audio
from app.types.responses import ContentResponse

class AddTaskCommand(TaskCommand):
    commands =  ['add task', 'create task for', 'create task', 'append task']
    def handle(self, prompt:str):

        taskName = self.extractTaskName(prompt)

        taskList = Tasks.getTaskList()
        taskList.addTask(taskName)

        resp = ContentResponse(type='tasks', data={'tasks': taskList.getTasks()})
        super().output(resp)
        Audio.output(f'Sure ill add a task for {taskName}')

