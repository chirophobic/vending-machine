import { ApiProperty } from '@nestjs/swagger';

export class InsertCoinDto {
    @ApiProperty({
        description: 'The ID of the vending machine',
        type: Number,
        required: true,
    })
    readonly vendingMachineId!: number;

    @ApiProperty({
        description: 'The coin to insert into the vending machine',
        type: String,
        required: true,
        examples: {
            '50 cents': '50c',
            'two dollars': '$2',
        },
    })
    readonly coin!: string;
}
