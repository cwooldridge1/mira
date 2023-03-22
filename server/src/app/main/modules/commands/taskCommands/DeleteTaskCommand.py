from .TaskCommand import TaskCommand
# from ...Audio import Audio

class DeleteTaskCommand(TaskCommand):
    commands =  ['delete task', 'remove task']
    actionWords = {'delete', 'remove'}

    def handle(self, prompt:str):

        taskTitle = self.extractTaskTitle(prompt)

        self.taskList.deleteTask(taskTitle)

        super().outputTasks()
        # Audio.output(f'Sure ill delete the task for {taskTitle}')


    def getSimilarity(self, prompt) -> float:
        score =  super().getSimilarity(prompt)
        #the prompt must contain one of the key word task and must contain ones of the action words
        words = set(prompt.split(' '))
        if 'task' not in words:
            return 0

        return score if any(word in self.actionWords for word in words) else 0