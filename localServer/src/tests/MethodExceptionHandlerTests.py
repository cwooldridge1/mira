from unittest import TestCase
from app.main.metaclasses import MethodExceptionHandler
import io
import sys

BASE_FAIL_MSG = 'base fail'
SUB_SUB_FAIL_MSG = 'sub sub fail'

class TestBaseClass(metaclass=MethodExceptionHandler):
    def handle(self):
        pass

    def fail(self):
        print(BASE_FAIL_MSG)

class Subclass(TestBaseClass):
    def handle(self):
        raise ValueError

class SubSubClass(Subclass):
    def fail(self):
        print(SUB_SUB_FAIL_MSG)

class MethodExceptionHandlerTests(TestCase):
    def assertFuncStdout(self, func, expectedOutput):
        # Create a new output stream object
        capturedOutput = io.StringIO()

        # Replace the standard output stream with the new object
        sys.stdout = capturedOutput

        # Call the function that writes to standard output
        func()

        # Reset the standard output stream to its original value
        sys.stdout = sys.__stdout__

        # Get the captured output
        output = capturedOutput.getvalue()

        self.assertEqual(output.strip(), expectedOutput)

    def test_1_subclass_calls_base_fail(self):
        obj = Subclass()
        self.assertFuncStdout(obj.handle, BASE_FAIL_MSG)
    
    def test_2_subsubclass_calls_its_fail(self):
        obj = SubSubClass()
        self.assertFuncStdout(obj.handle, BASE_FAIL_MSG)
