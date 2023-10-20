import socket

# Create a UDP socket
udp_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

# Specify the server address (use an empty string for the host to bind to all available network interfaces)
server_address = ("127.0.0.1", 12345)  # Use a specific port number, e.g., 12345

# Bind the socket to the server address
udp_socket.bind(server_address)

print(f"Server is listening on {server_address[0]}:{server_address[1]}")

while True:
    data, client_address = udp_socket.recvfrom(1024)  # 1024 is the buffer size
    print(f"Received message: {data.decode()} from {client_address[0]}:{client_address[1]}")
    
    # Echo the received message back to the client
    udp_socket.sendto(data, client_address)
