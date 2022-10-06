export class VendingMachineNotFoundError extends Error {
    readonly vendingMachineId: number;

    constructor(vendingMachineId: number) {
        super('Vending Machine was not found');
        this.vendingMachineId = vendingMachineId;
    }
}
