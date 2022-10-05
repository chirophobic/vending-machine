import { Given, When, Then, World, setWorldConstructor, Before } from '@cucumber/cucumber';
import { expect } from 'expect';
import { foobar } from '@vending-machine/domain';

class CustomWorld extends World {
    args: string[] = [];

    initialize(): void {
        // TODO
    }
}

setWorldConstructor(CustomWorld);

Before(function(this: CustomWorld) {
    this.initialize();
});

Given('I have foo', function (this: CustomWorld) {
    this.args = ['foo'];
})

When('I bar', function (this: CustomWorld) {
    this.args.push('bar');
});

Then('I should have foobar', function (this: CustomWorld) {
    expect(foobar(...this.args)).toBe('');
})
