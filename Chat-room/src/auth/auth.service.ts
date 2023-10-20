import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from 'src/auth/auth.dto';
import { User } from 'src/models/User.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register({ username, password }: AuthDto) {
    if (await this.userRepository.findOne({ where: { username } }) !== null)
      throw new ConflictException();

    await this.userRepository.save({
      username,
      password: bcrypt.hashSync(password, 10),
    });

    return { status: 'Success' };
  }

  async login({ username, password }: AuthDto) {
    const user = await this.userRepository.findOne({ where: { username } });

    if (user === null) throw new NotFoundException();

    const result = await bcrypt.compare(password, user.password);

    if (!result) throw new UnauthorizedException();

    const jwt = await this.jwtService.signAsync({
      id: user.id,
      username: user.username,
    });

    return jwt;
  }
}
