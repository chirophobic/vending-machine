import { Inject, Injectable } from '@nestjs/common';
import {
    type IVendingMachineRepository,
    type VendingMachine,
    VendingMachineProperties,
    IVendingMachineFactory,
} from '@vending-machine/modules/vending-machine/domain';

@Injectable()
export class VendingMachineRepository implements IVendingMachineRepository {
    private store = new Map<number, string>();
    private nextId = 0;

    constructor(@Inject(IVendingMachineFactory) private readonly factory: IVendingMachineFactory) {}

    findById(id: number): Promise<VendingMachine | null> {
        const raw = this.store.get(id);
        if (!raw) {
            return Promise.resolve(null);
        }

        const properties: VendingMachineProperties = JSON.parse(raw);
        return Promise.resolve(this.factory.hydrate(properties));
    }

    getNextId(): Promise<number> {
        return Promise.resolve(++this.nextId);
    }

    save(vendingMachine: VendingMachine): Promise<void> {
        vendingMachine.commit();
        const properties: VendingMachineProperties = {
            id: vendingMachine.id,
            coinReturn: vendingMachine.coinReturn,
            insertedAmount: vendingMachine.insertedAmount,
        };

        this.store.set(properties.id, JSON.stringify(properties));

        return Promise.resolve();
    }
}
