import { Module } from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {InsertCoinCommandHandler} from "./commands/insert-coin.command-handler";
import {CoinInsertedEventHandler} from "./events/coin-inserted.event-handler";

const EVENT_HANDLERS = [
    CoinInsertedEventHandler
];

const COMMANDS_HANDLERS = [
    InsertCoinCommandHandler
];

@Module({
    imports: [CqrsModule],
    providers: [
        ...EVENT_HANDLERS,
        ...COMMANDS_HANDLERS,
    ],
    exports: [],
})
export class ApplicationModule {}
