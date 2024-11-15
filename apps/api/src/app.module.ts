import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PartModule } from './part/part.module';
import { AppService } from './app.service';

@Module({
  imports: [,
    PartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
