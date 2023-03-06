from os import path
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build, Resource

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/tasks']


class TaskService:

    __service = None
    __credentials = None

    @classmethod
    def _getCredentials(cls):
        credentials = cls.__credentials

        # The file token.json stores the user's access and refresh tokens, and is
        # created automatically when the authorization flow completes for the first
        # time.
        if path.exists('token.json'):
            credentials = Credentials.from_authorized_user_file('token.json', SCOPES)
            
        # If there are no (valid) credentials available, let the user log in.
        if not credentials or not credentials.valid:
            if credentials and credentials.expired and credentials.refresh_token:
                credentials.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    'credentials.json', SCOPES)
                credentials = flow.run_local_server(port=0)
            # Save the credentials for the next run
            with open('token.json', 'w') as token:
                token.write(credentials.to_json())
        cls.__credentials = credentials
        
        return credentials

    @classmethod
    def getService(cls) -> Resource:

        if cls.__service and cls.__credentials.valid:
            return cls.__service

        credentials = cls._getCredentials()
        cls.__service = build('tasks', 'v1', credentials=credentials)

        return cls.__service

    @classmethod
    def tasks(cls) -> Resource:
        return cls.getService().tasks()

    @classmethod
    def taskLists(cls) -> Resource:
        return cls.getService().tasklists()