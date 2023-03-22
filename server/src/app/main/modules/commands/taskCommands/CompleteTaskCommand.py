from .TaskCommand import TaskCommand
# from ...Audio import Audio

class CompleteTaskCommand(TaskCommand):
    commands =  ['complete task', 'mark task as complete', 'I finished task', 'I completed the task']
    actionWords = {'complete', 'mark', 'finished', 'task', 'completed'}

    def handle(self, prompt:str):

        taskTitle = self.extractTaskTitle(prompt)

        self.taskList.markTaskComplete(taskTitle)
           

        super().outputTasks()
        # Audio.output(f'Sure ill mark {taskTitle} as complete')

    def hasActionWord(self, prompt:str, actionWords:set):
        words = prompt.split(' ')
        return any(word in actionWords for word in words)


    def getSimilarity(self, prompt:str) -> float:
        score =  super().getSimilarity(prompt)

        if self.hasActionWord(prompt, {'task'}) and self.hasActionWord(prompt, self.actionWords):
            return score
        else:
            return  0
