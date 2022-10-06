export interface ProductProperties {
    readonly code: string;
    readonly price: number;
    readonly quantity: number;
}

export class Product implements ProductProperties {
    readonly code: string;
    readonly price: number;
    readonly quantity: number;

    constructor(properties: ProductProperties) {
        this.code = properties.code;
        this.price = properties.price;
        this.quantity = properties.quantity;
    }
}
