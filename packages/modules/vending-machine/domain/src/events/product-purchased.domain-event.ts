import type { VendingMachine } from '../vending-machine';
import type { Product } from '../product';

export class ProductPurchasedDomainEvent {
    readonly vendingMachineId: number;
    readonly productCode: string;
    readonly date: Date;
    readonly price: number;
    readonly remainingQuantity: number;

    constructor(vendingMachine: VendingMachine, product: Product) {
        this.vendingMachineId = vendingMachine.id;
        this.productCode = product.code;
        this.date = new Date();
        this.price = product.price;
        this.remainingQuantity = product.quantity;
    }
}
