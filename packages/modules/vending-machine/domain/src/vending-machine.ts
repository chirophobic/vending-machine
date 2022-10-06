import { AggregateRoot } from '@nestjs/cqrs';
import { ValidCoinReceivedDomainEvent } from './events/valid-coin-received.domain-event';
import { InvalidCoinReceivedDomainEvent } from './events/invalid-coin-received.domain-event';
import { CoinInsertedDomainEvent } from './events/coin-inserted.domain-event';
import { COIN_VALUES, ValidCoin, ValidCoinSpecification } from './valid-coin-specification';

export interface VendingMachineProperties {
    readonly id: number;
    readonly insertedAmount: number;
    readonly coinReturn: string[];
}

export interface VendingMachine extends VendingMachineProperties {
    insertCoin(coin: string): void;
    getDisplay(): string;
    commit(): void;
}

export class VendingMachineImplementation extends AggregateRoot implements VendingMachine {
    readonly id: number;
    readonly coinReturn: string[] = [];
    insertedAmount = 0;

    constructor(properties: VendingMachineProperties) {
        super();
        this.id = properties.id;
        this.insertedAmount = properties.insertedAmount;
        this.coinReturn = properties.coinReturn;
    }

    insertCoin(coin: string): void {
        const specification = new ValidCoinSpecification();
        this.publish(new CoinInsertedDomainEvent());

        if (specification.validateCoin(coin)) {
            this.acceptCoin(coin);
        } else {
            this.rejectCoin(coin);
        }
    }

    getDisplay(): string {
        return `$${(this.insertedAmount / 100).toFixed(2)}`;
    }

    private acceptCoin(coin: ValidCoin): void {
        this.publish(new ValidCoinReceivedDomainEvent());
        this.insertedAmount += COIN_VALUES[coin];
    }

    private rejectCoin(_coin: string): void {
        this.publish(new InvalidCoinReceivedDomainEvent());
    }
}
