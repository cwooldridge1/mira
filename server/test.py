import unittest
import os
from dotenv import load_dotenv
load_dotenv()

# Get the absolute path to the tests directory
testsDirectory = os.path.abspath(os.path.join(os.path.dirname(__file__), 'tests'))

# Discover all tests in the 'tests' directory
suite = unittest.TestLoader().discover(testsDirectory, pattern='TaskCommandsTests.py')

# Run the test suite
unittest.TextTestRunner(verbosity=2).run(suite)
