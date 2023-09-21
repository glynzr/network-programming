#TCP Server side
import socket


#creating the server socket using IPv4(AF_INET) and TCP(SOCK_STREAM)
server_socket= socket.socket(socket.AF_INET,socket.SOCK_STREAM)

#binding our server socket
#server_socket.bind((socket.gethostbyname(socket.gethostname()),12346))
server_socket.bind(("127.0.0.1",12346))


#listening for incoming requests
server_socket.listen()

#listen forever to accept requests
while True:
    #accept every single connection and stores two pieces of information
    client_socket,client_address= server_socket.accept()
    print(type(client_socket))
    print(type(client_address))
    print(f"Connected to {client_address}!\n")
    client_socket.send("You are connected!".encode("utf-8"))

    #close the server socket
    server_socket.close()
    break
