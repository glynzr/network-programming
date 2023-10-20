import socket

# Create a UDP socket
udp_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

# Specify the server address and port to send the message to
server_address = ("127.0.0.1", 12345)  # Replace with the server's IP address and port

while True:
    message = input("Enter a message to send to the server (or 'exit' to quit): ")
    
    if message.lower() == 'exit':
        break
    
    # Send the message to the server
    udp_socket.sendto(message.encode(), server_address)
    
    # Receive the server's response
    response, _ = udp_socket.recvfrom(1024)
    print(f"Server response: {response.decode()}")

# Close the socket
udp_socket.close()
