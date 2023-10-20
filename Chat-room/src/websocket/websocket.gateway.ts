import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebsocketService } from './websocket.service';

@WebSocketGateway({ cors: true })
export class WebsocketGateway
  implements OnGatewayConnection
{
  constructor(private readonly websocketServer: WebsocketService) {}

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody('token') token: string,
    @MessageBody('message') message: string,
    @MessageBody('roomId') roomId: string,
    @ConnectedSocket() client: Socket,
  ) {
    const messageData = await this.websocketServer.sendMessage(
      token,
      roomId,
      message,
    );
    client.to(roomId).emit('message', messageData);
    return messageData;
  }

  handleConnection(client: Socket, ...args: any[]) {
    return client.emit('welcome', 'Salam istifadechi: ' + client.id);
  }

  @SubscribeMessage('join')
  async joinRoom(
    @MessageBody('roomId') roomId: string,
    @ConnectedSocket() client: Socket,
  ) {
    await client.join(roomId);
    return roomId;
  }

  @SubscribeMessage('get_messages')
  async getMessages(
    @MessageBody('roomId') roomId: string,
    @ConnectedSocket() client: Socket,
  ) {
    const messages = await this.websocketServer.getMessages(roomId);
    client.send(messages);
    return messages;
  }

  @SubscribeMessage('get_active_rooms')
  async getActiveRooms() {
    const rooms = await this.websocketServer.getActiveRooms();
    return rooms;
  }
}
