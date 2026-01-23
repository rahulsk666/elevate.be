import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './app/user/user.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './app/auth/auth.module';
import databaseConfig from './config/database.config';
import { APP_PIPE } from '@nestjs/core';
import { CourseModule } from './app/course/course.module';
import { RoadmapModule } from './app/roadmap/roadmap.module';
import { LessonModule } from './app/lesson/lesson.module';
import jwtConfig from './config/jwt.config';
import googleOauthConfig from './config/google-oauth.config';
import refreshJwtConfig from './config/refresh-jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, googleOauthConfig,jwtConfig,refreshJwtConfig],
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    CourseModule,
    RoadmapModule,
    LessonModule,
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
