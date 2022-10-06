import type { VendingMachine } from './vending-machine';

export const IVendingMachineRepository = Symbol('IVendingMachineRepository');

export interface IVendingMachineRepository {
    getNextId(): Promise<number>;
    findById(id: number): Promise<VendingMachine | null>;
    save(vendingMachine: VendingMachine): Promise<void>;
}
