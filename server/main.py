from __future__ import print_function
# from googleapiclient.discovery import build
# from google_auth_oauthlib.flow import InstalledAppFlow
# from google.auth.transport.requests import Request
import os
import pyttsx3
import speech_recognition as sr

# SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']
# MONTHS = ["january", "february", "march", "april", "may", "june","july", "august", "september","october","november", "december"]
# DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
# DAY_EXTENTIONS = ["rd", "th", "st", "nd"]

def speak(text):
    engine = pyttsx3.init()
    engine.say(text)
    engine.runAndWait()

def get_audio():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        audio = r.listen(source)
        said = ""

        try:
            said = r.recognize_google(audio)
            print(said)
        except Exception as e:
            print("Exception: " + str(e))

    return said.lower()






WAKE = "hey tim"
print("Start")

while True:
    print("Listening")
    text = get_audio()

    if text.count(WAKE) > 0:
        speak("I am ready")
        text = get_audio()

        CALENDAR_STRS = ["what do i have", "do i have plans", "am i busy"]
        for phrase in CALENDAR_STRS:
            speak("I don't understand")

        NOTE_STRS = ["make a note", "write this down", "remember this"]
        for phrase in NOTE_STRS:
            if phrase in text:
                speak("What would you like me to write down?")
                note_text = get_audio()
                speak("I've made a note of that.")