import os
import requests

class OpenAI:
    __url = "https://api.openai.com/v1/completions"

    __headers = {
        "Content-Type": "application/json",
        "Authorization": f'Bearer {os.environ.get("OPENAI_KEY")}',
    }
    
    @staticmethod
    def formatPrompt(prompt) -> dict:
        '''
        Formats he prompt in the needed format so OpenAI can use it
        '''
        return {
            "model": "text-davinci-003",
            "prompt": prompt,
            "temperature": 0.7,
            "max_tokens": 1000,
        }

    @staticmethod
    def ask(prompt: str) -> str:
        '''
        Asks a question to OpenAI's divinchi model and if the the response status is not 200 it raises an IOError
        :param prompt: is the question that you want to ask
        '''
        response = requests.post(OpenAI.__url, headers=OpenAI.__headers, json=OpenAI.formatPrompt(prompt))
        if response.status_code == 200:
            # Request was successful - get the text of the response
            answer = response.json()["choices"][0]["text"].lstrip("\n")
        else:
            raise IOError

        return answer