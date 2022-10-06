import type {ICommandHandler} from "@nestjs/cqrs";
import {InsertCoinCommand} from "./insert-coin.command";
import {CommandHandler} from "@nestjs/cqrs";
import {Inject} from "@nestjs/common";
import {IVendingMachineRepository} from "@vending-machine/domain";
import {InsertCoinResult} from "./insert-coin.result";

@CommandHandler(InsertCoinCommand)
export class InsertCoinCommandHandler implements ICommandHandler<InsertCoinCommand, InsertCoinResult> {
    constructor(
        @Inject(IVendingMachineRepository) private readonly repository: IVendingMachineRepository,
    ) {
    }

    async execute(command: InsertCoinCommand): Promise<InsertCoinResult> {
        const vendingMachine = await this.repository.findById(command.vendingMachineId);
        
        if (!vendingMachine) {
            throw new Error();
        }
        
        vendingMachine.insertCoin(command.coin);
        
        await this.repository.save(vendingMachine);
        return new InsertCoinResult(true);
    }
}
