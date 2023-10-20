import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/models/Message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WebsocketService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly jwtService: JwtService,
  ) {}

  async sendMessage(token: string, roomId: string, message: string) {
    const verified = await this.jwtService.verifyAsync(token);
    const { id, username } = verified;
    await this.messageRepository.save({
      roomId: roomId,
      user: { id },
      message,
    });
    return [
      {
        id,
        user: { username },
        roomId,
        message,
        createdAt: new Date(Date.now()),
      },
    ];
  }

  async getMessages(roomId: string) {
    return this.messageRepository
      .find({
        where: { roomId },
        relations: { user: true },
      })
      .then((d) => {
        console.log(d.length);
        return d;
      });
  }

  getActiveRooms() {
    return this.messageRepository
      .find({ select: { roomId: true } })
      .then((value) => {
        return [...new Set(value.map((e) => e.roomId))];
      });
  }
}
