import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './websocket';

@Module({
  imports: [AppGateway],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
