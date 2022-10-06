import { Module } from '@nestjs/common';
import { VendingMachineRepository } from './repositories/vending-machine-repository';
import {
    IVendingMachineFactory,
    IVendingMachineRepository,
    VendingMachineFactoryImplementation,
} from '@vending-machine/modules/vending-machine/domain';
import { CqrsModule, EventPublisher } from '@nestjs/cqrs';

@Module({
    imports: [CqrsModule],
    providers: [
        VendingMachineRepository,
        {
            provide: IVendingMachineRepository,
            useExisting: VendingMachineRepository,
        },
        {
            provide: IVendingMachineFactory,
            inject: [EventPublisher],
            useFactory: (eventPublisher: EventPublisher) => {
                return new VendingMachineFactoryImplementation(eventPublisher);
            },
        },
    ],
    exports: [IVendingMachineRepository, IVendingMachineFactory],
})
export class VendingMachineInfrastructureModule {}
