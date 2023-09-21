#TCP Listen socket
import socket

#creating the client server using IPv4(AF_INET) and TCP(SOCK_STREAM)
client_socket=socket.socket(socket.AF_INET,socket.SOCK_STREAM)

#connect to the server socket
client_socket.connect(("127.0.0.1",12346))


#receive the message
message=client_socket.recv(1024)
print(message.decode("utf-8"))


#close the client socket
client_socket.close()