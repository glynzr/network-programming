#UDP client socket
import socket

#create a client socket using IPv4(AF_INET) and UDP(SOCK_DGRAM)
client_socket=socket.socket(socket.AF_INET,socket.SOCK_DGRAM)

client_socket.sendto("Hello server!!".encode("utf-8"),("127.0.0.1",12345))
