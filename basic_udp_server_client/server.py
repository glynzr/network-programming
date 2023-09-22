#UDP server socket
import socket

#create a server socket using IPv4(AF_INET) and UDP(SOCK_DGRAM)
server_socket=socket.socket(socket.AF_INET,socket.SOCK_DGRAM)

server_socket.bind((socket.gethostbyname(socket.gethostname()),12345))

message,client_address= server_socket.recvfrom(1024)
print(message.decode("utf-8"))