#chat (server side)
import socket

HOST="127.0.0.1"
PORT=12345
ENCODER="utf-8"
BYTESIZE=1024


#create a server socket using IPv4(AF_INET) and TCP(SOCK_STREAM)
server_socket=socket.socket(socket.AF_INET,socket.SOCK_STREAM)

#binding ip adress and port to server socket
server_socket.bind((HOST,PORT))

#listening to all coming requests
server_socket.listen()

print("Server is running...")


client_socket,client_address= server_socket.accept()

client_socket.send("Connected to the server!!!".encode("utf-8"))

#send/receive messages

while True:
    message=client_socket.recv(BYTESIZE).decode(ENCODER)
    if message=="quit":
        client_socket.send("quit".encode(ENCODER))
        print("Ending the chat...GOODBYE!!!")
        break
    else:
        print(message)
        message=input("enter your message:")
        client_socket.send(message.encode(ENCODER))


server_socket.close()




