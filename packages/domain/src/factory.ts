import {Inject, Injectable} from "@nestjs/common";
import type {VendingMachine, VendingMachineProperties} from "./vending-machine";
import {EventPublisher} from "@nestjs/cqrs";
import {VendingMachineImplementation} from "./vending-machine";
import {IVendingMachineRepository} from "./repository";

@Injectable()
export class VendingMachineFactory {
    constructor(
        private readonly publisher: EventPublisher,
        @Inject(IVendingMachineRepository) private readonly repository: IVendingMachineRepository,
    ) {
    }
    
    async create(properties: Omit<VendingMachineProperties, 'id'>): Promise<VendingMachine> {
        return this.hydrate({ ...properties, id: await this.repository.getNextId()})
    }

    hydrate(properties: VendingMachineProperties): VendingMachine {
        return this.publisher.mergeObjectContext(
            new VendingMachineImplementation(properties)
        );
    }
}
