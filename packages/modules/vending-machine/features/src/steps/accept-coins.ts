import { Given, When, Then, World, setWorldConstructor, Before } from '@cucumber/cucumber';
import { expect } from 'expect';
import { type VendingMachine, VendingMachineImplementation } from '@vending-machine/modules/vending-machine/domain';

class CustomWorld extends World {
    vendingMachine!: VendingMachine;
    args: string[] = [];

    initialize(): void {
        // Always create an empty vending machine
        this.vendingMachine = new VendingMachineImplementation({
            id: 1,
            coinReturn: [],
            insertedAmount: 0,
        });
    }
}

setWorldConstructor(CustomWorld);

Before(function (this: CustomWorld) {
    this.initialize();
});

Given('I have inserted no coins', function (this: CustomWorld) {
    this.vendingMachine = new VendingMachineImplementation({
        id: 1,
        coinReturn: [],
        insertedAmount: 0,
    });
});

When('I insert a {string} coin', function (this: CustomWorld, coin: string) {
    this.vendingMachine.insertCoin(coin);
});

Then('the amount inserted should display {string}', function (this: CustomWorld, amount: string) {
    expect(this.vendingMachine.getDisplay()).toBe(amount);
});
