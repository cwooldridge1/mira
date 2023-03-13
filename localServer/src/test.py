import unittest
import os
from dotenv import load_dotenv
load_dotenv()

os.environ['ENV']= 'test'
os.environ['DEFAULT_GOOGLE_TASK_LIST'] = 'test'

# Get the absolute path to the tests directory
testsDirectory = os.path.abspath(os.path.join(os.path.dirname(__file__), 'tests'))

# Discover all tests in the 'tests' directory
suite = unittest.TestLoader().discover(testsDirectory, pattern='*Tests.py')

# Run the test suite
unittest.TextTestRunner(verbosity=2).run(suite)
