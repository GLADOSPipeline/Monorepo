import hashlib #library to hash a password
class User:
    def __init__(self, username, password):
        self.username = username
        self.password = password
    def hashPassowrd(password):
        return hashlib.sha256(str.encode(password)).hexdigest()
    def changePasword(password):
        self.passowrd = hashlib.sha256(str.encode(password)).hexdigest()
        #figure out how to invoke and call this in the front end
    #need to figure out how to add it
    def deleteUser(self):
        return ""

