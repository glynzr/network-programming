import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { WebsocketService } from './websocket.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtConfig } from 'src/configuration/jwt.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/models/Message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useClass: JwtConfig,
    }),
  ],
  providers: [WebsocketGateway, WebsocketService],
})
export class WebsocketModule {}
