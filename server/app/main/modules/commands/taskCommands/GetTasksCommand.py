from .TaskCommand import TaskCommand
from ...Audio import Audio

class GetTasksCommand(TaskCommand):
    commands =  ['show me my tasks', 'read me my tasks', 'what tasks do I have today', 'pull up my tasks', 'Do I have tasks to do today', 'Do I have any tasks to do today']
    def handle(self, prompt:str):

        tasks = self.taskList.getTasks() 

        super().outputTasks(tasks)

        if len(tasks) == 0:
            Audio.output('You currently do not have any tasks')

        audioOutputText = 'Here are the tasks you have: ' + '.'.join([task.title for task in tasks])
        Audio.output(audioOutputText)


    def getSimilarity(self, prompt) -> float:
        score =  super().getSimilarity(prompt)
        words = set(prompt.split(' '))

        if 'tasks' not in words:
            return 0

        return score