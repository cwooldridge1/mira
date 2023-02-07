from ..Command import Command

class TaskCommand(Command):
    def extractTaskName(self, prompt):
        prompt = prompt.split('task')
        if len(prompt) == 1:
            raise ValueError('Task name not found')
        
        taskName = prompt[-1].strip()

        #if the first word is 'for' then we need to trim this
        if taskName[:3] == 'for':
            taskName = taskName[4:] # 4 to also remove the space
        elif taskName[:2] == 'to':
            taskName = taskName[3:]


        return taskName