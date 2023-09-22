#chat(client side)
import  socket

HOST="127.0.0.1"
PORT=12345
ENCODER="utf-8"
BYTESIZE=1024

#create a client using IPv4(AF_INET) and TCP(SOCK_STREAM)
client_socket= socket.socket(socket.AF_INET,socket.SOCK_STREAM)

#connecting to the server
client_socket.connect((HOST,PORT))

#send/receive the message
while True:
    messsage=client_socket.recv(BYTESIZE).decode(ENCODER)
    
    if messsage.lower().strip()=="quit":
        client_socket.send("quit".encode(ENCODER))
        print("Ending the chat...GOODBYE!!!")
        break
    else:
        print(messsage)
        messsage=input("Enter your message:")
        client_socket.send(messsage.encode(ENCODER))


client_socket.close()