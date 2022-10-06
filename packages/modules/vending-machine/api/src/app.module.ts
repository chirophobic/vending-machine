import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    imports: [CqrsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
