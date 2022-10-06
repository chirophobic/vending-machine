export class ProductPurchasedDomainEvent {
    readonly productId!: number;
    readonly date!: Date;
    readonly price!: number;
    readonly remaining!: number;
}
