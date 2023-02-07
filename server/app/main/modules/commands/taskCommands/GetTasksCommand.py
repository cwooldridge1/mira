from .TaskCommand import TaskCommand
from ...Tasks import Tasks
from ...Audio import Audio
from app.types.responses import ContentResponse

class GetTasksCommand(TaskCommand):
    commands =  ['show me my tasks', 'read me my tasks', 'what tasks do I have today', 'pull up my tasks', 'Do I have anything to do today']
    def handle(self, prompt:str):

        tasks = Tasks.getTaskList().getTasks()

        resp = ContentResponse(type='tasks', data={'tasks': tasks})
        super().output(resp)

        if len(tasks) == 0:
            Audio.output('You currently do not have any tasks')

        audioOutputText = 'Here are the tasks you have: ' + '.'.join([task.title for task in tasks])
        Audio.output(audioOutputText)

