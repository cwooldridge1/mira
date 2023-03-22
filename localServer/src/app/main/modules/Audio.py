from gtts import gTTS
import os
import speech_recognition as sr
import asyncio
from ...types import CircularBuffer

class Audio:
    #the language to speak
    __lang = 'en'
    # this is essentially the accent associated with the language
    __tld = 'co.in'
    @staticmethod
    def output(text:str):
        if os.environ.get('ENV') != 'test':
    
            tts = gTTS(text, lang=Audio.__lang,tld=Audio.__tld)
            # Save the audio file
            tts.save('audio.mp3')
            # Play the audio file
            os.system("mpg123 audio.mp3")

    @staticmethod
    def input() -> str:
        '''
        Listens and returns the text
        '''
        r = sr.Recognizer()
        with sr.Microphone() as source:
            audio = r.listen(source)
            said = ""
            try:
                said = r.recognize_google(audio)
            except Exception as e:
                pass
        return said.lower()



