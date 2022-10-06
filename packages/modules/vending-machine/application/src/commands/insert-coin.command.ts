import type { ICommand } from '@nestjs/cqrs';

export class InsertCoinCommand implements ICommand {
    constructor(public readonly vendingMachineId: number, public readonly coin: string) {}
}
