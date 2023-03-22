from .Command import Command
from ....types.responses import ContentResponse
from ..OpenAI import OpenAI

class CodeCommand(Command):
    commands =  [    "Code up",    "Implement code for",    "Write the code for", 'Right code in'   "Program",    "Develop",    "Code out",    "Create code for",    "Craft the code for",    "Write the programming for",    "Construct the code for",    "Assemble the code for",    "Compose the code for",    "Write the programming logic for",    "Write the code implementation for",    "Write the software for",    "Code the solution for",    "Write the technical solution for",    "Write the codebase for",    "Write the software implementation for",    "Write the code execution for", "Pull up code of"]
    languages = {
    "abap": "abap",
    "actionscript": "actionscript",
    "ada": "ada",
    "arduino": "arduino",
    "autoit": "autoit",
    "c": "c",
    "clojure": "clojure",
    "cs": "cs",
    "c++": "cpp",
    "coffeescript": "coffeescript",
    "c#": "csharp",
    "css": "css",
    "cuda": "cuda",
    "d": "d",
    "dart": "dart",
    "delphi": "delphi",
    "elixir": "elixir",
    "elm": "elm",
    "erlang": "erlang",
    "fortran": "fortran",
    "foxpro": "foxpro",
    "f#": "fsharp",
    "go": "go",
    "graphql": "graphql",
    "gql": "gql",
    "groovy": "groovy",
    "haskell": "haskell",
    "haxe": "haxe",
    "html": "html",
    "java": "java",
    "javascript": "javascript",
    "json": "json",
    "julia": "julia",
    "jsx": "jsx",
    "js": "js",
    "kotlin": "kotlin",
    "latex": "latex",
    "lisp": "lisp",
    "livescript": "livescript",
    "lua": "lua",
    "mathematica": "mathematica",
    "makefile": "makefile",
    "matlab": "matlab",
    "objective-c": "objectivec"}

    def handle(self, prompt):
        '''
        Gets the code
        '''
        try:
            answer = OpenAI.ask(prompt)
        except IOError:
            super().fail()
        else:
            resp = ContentResponse(type='code', data={'text': answer, 'language': self.getProgrammingLanguage(prompt)})
            super().output(resp)
            # Audio.output(f'Sure, heres how you do it')


    def getProgrammingLanguage(self, prompt:str) -> str:
        '''
        Matches the a prompt to a given programming laguage so the UI knows what language to represent the code in. Defaults to python if the language is not found
        '''
        language = 'python'
        for word in prompt.split(' '):
            word = word.lower()
            if word in self.languages:
                language = self.languages[word]
        return language