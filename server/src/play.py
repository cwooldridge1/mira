from dotenv import load_dotenv
load_dotenv()
import openai
from typing import Tuple, Any, Callable
from abc import ABC, abstractmethod
from collections import deque

import app.main.modules.commands as commands
print(commands)

# openai.api_key = "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"

# model_engine = "gpt-3.5-turbo"
# temperature = 0.7
# max_tokens = 100

# class Command(ABC):
#     @abstractmethod
#     def execute(self) -> dict:
#         ...

# class ChartCommand(Command):
#     def __init__(self, ticker: str) -> None:
#         super().__init__()
#         self.ticker = ticker
#     def execute(self):
#         return {'ticker': self.ticker}



# class GPTCommander():
#     def __init__(self) -> None:
#         self.__model = "davinci:ft-personal-2023-04-12-22-55-38"
#         self.temperature=0.7
#         self.maxTokens = 100
#         self.history:deque[Command] = deque()
#         self.maxHistoryLength = 100
#         self.commands= {
#             'ChartCommand': lambda x: 'ChartCommand ' + x,
#             'CodeCommand': lambda x: 'CodeCommand ' + x,
#             'AddTaskCommand': lambda x: 'AddTaskCommand ' + x,
#             'FallbackCommand': lambda x: 'FallbackCommand ' + x
#         }

#     def getCommand(self, prompt: str) -> Tuple[Callable, Tuple[Any]]:
#         """
#         Retrieve the command and its arguments from the GPT model based on the given prompt.
#         """
#         response = openai.Completion.create(
#             model=self.__model,
#             prompt=prompt + " ->",
#         )['choices'][0]['text']

#         command = response.split('\n')[0].split(',')

#         func = self.commands.get(command[0])
#         if func is None:
#             func = self.commands['FallbackCommand']

#         args = tuple(arg.strip() for arg in command[1:])
#         return func, args

#     def handlePrompt(self, prompt: str):
#         """
#         Execute the appropriate command for the given prompt.
#         """
#         func, args = self.getCommand(prompt)
#         return func(*args)
    
#     def redoCommand(self):
#         command = self.history[-1]
#         return command.execute() 

#     def appendHistory(self, command: Command):
#         self.history.append(command)
#         if len(self.history) > self.maxHistoryLength:
#             self.history.popleft()


        
        
        
# commander = GPTCommander()      
# while True:
#     # get input from the user
#     user_input = input("")
#     print(commander.handlePrompt(user_input))





     