import { AggregateRoot } from '@nestjs/cqrs';
import {ValidCoinReceivedDomainEvent} from "./events/valid-coin-received.domain-event";
import {InvalidCoinReceivedDomainEvent} from "./events/invalid-coin-received.domain-event";
import {CoinInsertedDomainEvent} from "./events/coin-inserted.domain-event";
import {COIN_VALUES, ValidCoinSpecification} from "./valid-coin-specification";

export interface VendingMachineProperties {
    readonly insertedAmount: number;
    readonly coinReturn: string[];
}

export interface VendingMachine extends VendingMachineProperties {
    insertCoin(coin: string): void;

    getDisplay(): string;
}

export class VendingMachineImplementation extends AggregateRoot implements VendingMachine {
    readonly coinReturn: string[] = [];
    insertedAmount: number = 0;

    insertCoin(coin: string): void {
        const specification = new ValidCoinSpecification();
        this.publish(new CoinInsertedDomainEvent());

        if (specification.validateCoin(coin)) {
            this.publish(new ValidCoinReceivedDomainEvent());
            this.insertedAmount += COIN_VALUES[coin];
        } else {
            this.publish(new InvalidCoinReceivedDomainEvent());
        }
    }

    getDisplay(): string {
        return `$${(this.insertedAmount / 100).toFixed(2)}`;
    }

    private acceptCoin(): void {
        this.publish(new ValidCoinReceivedDomainEvent());
        this.insertedAmount += COIN_VALUES[coin];
    }

    private rejectCoin(): void {
        this.publish(new InvalidCoinReceivedDomainEvent());
    }
}
