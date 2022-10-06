
export class ProductPurchasedIntegrationEvent {
    readonly productId!: number;
    readonly date!: Date;
    readonly price!: number;
    readonly remaining!: number;
}
