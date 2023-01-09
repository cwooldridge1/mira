from .Command import Command
from Audio import Audio
import requests
import os
class Code(Command):
    commands =  [    "Code up",    "Implement code for",    "Write the code for",    "Program",    "Develop",    "Code out",    "Create code for",    "Craft the code for",    "Write the programming for",    "Construct the code for",    "Assemble the code for",    "Compose the code for",    "Write the programming logic for",    "Write the code implementation for",    "Write the software for",    "Code the solution for",    "Write the technical solution for",    "Write the codebase for",    "Write the software implementation for",    "Write the code execution for", "Pull up code of"]
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

    def handle(self, text):
        '''

        '''
        url = "https://api.openai.com/v1/completions"

        headers = {
            "Content-Type": "application/json",
            "Authorization": f'Bearer {os.environ.get("OPENAI_KEY")}',
        }

        data = {
            "model": "text-davinci-003",
            "prompt": text,
            "temperature": 0.7,
            "max_tokens": 1000,
        }
        response = requests.post(url, headers=headers, json=data)

        if response.status_code == 200:
            # Request was successful
            data = response.json()["choices"][0]["text"].lstrip("\n")
        else:
            # Request failed
            super().fail()

        Audio.output(f'Sure, heres how you do it')
        language = 'python'
        for word in text.split(' '):
            word = word.lower()
            if word in self.languages:
                language = self.languages[word]

        return super().output(200, 'content', {'type':'code', 'props': {'text': data, 'language': language}})