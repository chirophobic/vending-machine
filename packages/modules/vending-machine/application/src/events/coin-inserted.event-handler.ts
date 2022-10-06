import type { IEventHandler } from '@nestjs/cqrs';
import { CoinInsertedDomainEvent } from '@vending-machine/modules/vending-machine/domain';
import { EventsHandler } from '@nestjs/cqrs';

@EventsHandler(CoinInsertedDomainEvent)
export class CoinInsertedEventHandler implements IEventHandler<CoinInsertedDomainEvent> {
    handle(event: CoinInsertedDomainEvent): void {
        console.log(event);
    }
}
