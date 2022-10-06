import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CommandBus } from '@nestjs/cqrs';
import { InsertCoinCommand, InsertCoinResult } from '@vending-machine/application';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService, private readonly commandBus: CommandBus) {}

    @Get()
    getData() {
        return this.appService.getData();
    }

    @Post('insert-coin')
    async insertCoin(): Promise<boolean> {
        const command = new InsertCoinCommand(1, '5c');
        const { success } = await this.commandBus.execute<InsertCoinCommand, InsertCoinResult>(command);
        return success;
    }
}
