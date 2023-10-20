import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { User } from '../models/User.entity';
import { Message } from 'src/models/Message.entity';

@Injectable()
export class TypeormConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(
    connectionName?: string,
  ): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: this.configService.get<string>('TYPEORM_HOST'),
      password: this.configService.get<string>('TYPEORM_PASS'),
      username: this.configService.get<string>('TYPEORM_USER'),
      database: this.configService.get<string>('TYPEORM_DATA'),
      port: +this.configService.get<string>('TYPEORM_PORT'),
      entities: [User, Message],
      synchronize: true,
    };
  }
}
