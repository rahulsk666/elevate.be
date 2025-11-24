import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/database/database.module';
import { USER_REPOSITORY } from './repository/user.interface.repository';
import { UserPgRepository } from './repository/user.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    UserService,
    { provide: USER_REPOSITORY, useClass: UserPgRepository },
    UserPgRepository,
  ],
  exports: [UserService],
})
export class UserModule {}
