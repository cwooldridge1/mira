
class CircularBuffer(object):
    def __init__(self, size, data = []):
        self.index = 0
        self.size = size
        self.__data = list(data)

    def append(self, value):
        if len(self.__data) == self.size:
            self.__data[self.index] = value
        else:
            self.__data.append(value)
        self.index = (self.index + 1) % self.size

    def __getitem__(self, key):
        if len(self.__data) == self.size:
            return self.__data[(key + self.index) % self.size]
        else:
            return self.__data[key]

    def __repr__(self):
        return (self.__data[self.index:] + self.__data[:self.index]).__repr__() + ' (' + str(len(self.__data))+'/{} items)'.format(self.size)
