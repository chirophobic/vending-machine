import type { VendingMachine, VendingMachineProperties } from './vending-machine';
import { VendingMachineImplementation } from './vending-machine';
import type { EventPublisher } from '@nestjs/cqrs';

export const IVendingMachineFactory = Symbol('IVendingMachineFactory');

export interface IVendingMachineFactory {
    create(properties: Omit<VendingMachineProperties, 'id'>): Promise<VendingMachine>;
    hydrate(properties: VendingMachineProperties): VendingMachine;
}

export class VendingMachineFactoryImplementation implements IVendingMachineFactory {
    constructor(private readonly publisher: Pick<EventPublisher, 'mergeObjectContext'>) {}

    async create(properties: VendingMachineProperties): Promise<VendingMachine> {
        return this.hydrate(properties);
    }

    hydrate(properties: VendingMachineProperties): VendingMachine {
        return this.publisher.mergeObjectContext(new VendingMachineImplementation(properties));
    }
}
