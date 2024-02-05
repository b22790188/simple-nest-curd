import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { todoEntity } from './todo/todoEntity';

@Module({
  imports: [
    TodoModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configservice: ConfigService) => ({
        type: 'mariadb',
        host: configservice.get('DB_HOST'),
        port: configservice.get('DB_PORT'),
        username: configservice.get('DB_USER'),
        password: configservice.get('DB_PASSWORD'),
        database: configservice.get('DB_NAME'),
        // entities: [__dirname + '/**/*.entity{.ts,.js}'],
        entities: [todoEntity],
        synchronize: true,
      }),
    }),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
