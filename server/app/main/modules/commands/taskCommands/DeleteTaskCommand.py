from .TaskCommand import TaskCommand
from ...Tasks import Tasks
from ...Audio import Audio
from app.types.responses import ContentResponse

class DeleteTaskCommand(TaskCommand):
    commands =  ['delete task', 'remove task']

    def handle(self, prompt:str):

        taskName = self.extractTaskName(prompt)

        taskList = Tasks.getTaskList()
        taskList.deleteTask(taskName)

        resp = ContentResponse(type='tasks', data={'tasks': taskList.getTasks()})
        super().output(resp)
        Audio.output(f'Sure ill delete the task for {taskName}')
