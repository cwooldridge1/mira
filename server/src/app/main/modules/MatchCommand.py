from gensim.corpora import Dictionary
from gensim.similarities import SparseMatrixSimilarity
from nltk.stem import PorterStemmer
from nltk import download
download('stopwords')
from nltk.corpus import stopwords
from typing import List

# Preprocessing functions
stopWords = set(stopwords.words("english"))
stemmer = PorterStemmer()

class MatchCommand:
    @staticmethod
    def preprocess(text):
        """Preprocesses the given text by removing stop words and stemming the words."""
        words = text.lower().split()
        words = [stemmer.stem(word) for word in words if word not in stopWords]
        return " ".join(words)
    @staticmethod
    def getSimilarities(text:str, lines:list) -> List[float]:
        """
        Finds the line in the given array that is most similar to the given text.
        
        Parameters:
            text (str): The text snippet.
            lines (list of str): The array of lines.
            dictionary (gensim.corpora.Dictionary): The dictionary created from the text and lines.
        
        Returns:
            str: The line from the array that is most similar to the text snippet, or -1 if no good matches are found.
        """
        dictionary:Dictionary = Dictionary([text.split()] + [line.split() for line in lines])
        # Preprocess the text and lines
        text = MatchCommand.preprocess(text)
        lines = [MatchCommand.preprocess(line) for line in lines]

        # Convert the text snippet to a vector
        vec1 = dictionary.doc2bow(text.split())

        # Convert the lines to vectors
        vecs = [dictionary.doc2bow(line.split()) for line in lines]

        # Create a similarity index from the vectors
        index = SparseMatrixSimilarity(vecs, num_features=len(dictionary))

        # Calculate the similarity between the text snippet and each line
        similarities = index[vec1]

        return similarities