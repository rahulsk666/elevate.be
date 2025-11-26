import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './app/user/user.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './app/auth/auth.module';
import databaseConfig from './config/database.config';
import { APP_PIPE } from '@nestjs/core';
import { CourseModule } from './app/course/course.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    CourseModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
