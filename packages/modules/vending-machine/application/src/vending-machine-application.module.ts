import { DynamicModule, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InsertCoinCommandHandler } from './commands/insert-coin.command-handler';
import { CoinInsertedEventHandler } from './events/coin-inserted.event-handler';
import type { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';

const EVENT_HANDLERS = [CoinInsertedEventHandler];

const COMMANDS_HANDLERS = [InsertCoinCommandHandler];

@Module({})
export class VendingMachineApplicationModule {
    static register(imports: Exclude<ModuleMetadata['imports'], undefined>): DynamicModule {
        return {
            module: VendingMachineApplicationModule,
            imports: [CqrsModule, ...imports],
            providers: [...EVENT_HANDLERS, ...COMMANDS_HANDLERS],
            exports: [],
        };
    }
}
