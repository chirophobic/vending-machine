import { Body, Controller, Inject, NotFoundException, Post } from '@nestjs/common';
import { CommandBus, ICommandBus } from '@nestjs/cqrs';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { InsertCoinDto } from './dtos/insert-coin.dto';
import {
    InsertCoinCommand,
    InsertCoinResult,
    VendingMachineNotFoundError,
} from '@vending-machine/modules/vending-machine/application';

@Controller()
export class AppController {
    constructor(@Inject(CommandBus) private readonly commandBus: ICommandBus) {}

    @Post('insert-coin')
    @ApiBody({ type: InsertCoinDto })
    @ApiOkResponse({ type: Boolean })
    async insertCoin(@Body() dto: InsertCoinDto): Promise<boolean> {
        const command = new InsertCoinCommand(dto.vendingMachineId, dto.coin);
        try {
            const { success } = await this.commandBus.execute<InsertCoinCommand, InsertCoinResult>(command);
            return success;
        } catch (error: unknown) {
            if (error instanceof VendingMachineNotFoundError) {
                throw new NotFoundException('Vending Machine was not found');
            } else {
                throw error;
            }
        }
    }
}
