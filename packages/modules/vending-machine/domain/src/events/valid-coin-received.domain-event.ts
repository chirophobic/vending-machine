import type { IEvent } from '@nestjs/cqrs';
import type { VendingMachine } from '../vending-machine';

export class ValidCoinReceivedDomainEvent implements IEvent {
    readonly vendingMachineId: number;
    coin: string;

    constructor(vendingMachine: VendingMachine, coin: string) {
        this.vendingMachineId = vendingMachine.id;
        this.coin = coin;
    }
}
