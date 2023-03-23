import inspect

def handleException(func, fallbackFunc):
    def wrapped(self, *args, **kwargs):
        try:
            return func(self, *args, **kwargs)
        except Exception:
            v= fallbackFunc(self)
            return v
    return wrapped


class MethodExceptionHandler(type):
    def __new__(cls, name, bases, attrs, funcName='handle', fallbackFuncName='fail'):

        if funcName in attrs and fallbackFuncName in attrs:
            return super().__new__(cls, name, bases, attrs)

        #get all base classes as we might need to search all of them in the inheritance hierarchy for the func and fallbackFunc
        allBaseClasses = cls.getAllBaseClasses(bases)
        func = attrs[funcName] if funcName in attrs else cls.getFunctionFromBaseClasses(allBaseClasses, funcName)
        fallback = attrs[fallbackFuncName] if fallbackFuncName in attrs else cls.getFunctionFromBaseClasses(allBaseClasses, fallbackFuncName)

        attrs[funcName] = handleException(func, fallback) 

        return super().__new__(cls, name, bases, attrs)


    @classmethod
    def getAllBaseClasses(cls, topLevelBaseClasses):
        bases = []
        for base in topLevelBaseClasses:
            #getmro also includes the class of base so it is the nested classes + the base
            for nestedBase in inspect.getmro(base):
                bases.append(nestedBase)

        return bases


    @classmethod 
    def getFunctionFromBaseClasses(cls, baseClasses:list, targetFuncName:str):

        for base in baseClasses:
            if hasattr(base, targetFuncName):
                return getattr(base, targetFuncName)

        raise AttributeError(f'{targetFuncName} was not found in inhiritance tree')