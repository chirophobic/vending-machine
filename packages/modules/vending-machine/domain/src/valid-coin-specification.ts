export const COIN_VALUES = {
    '20c': 20,
    '50c': 50,
    $1: 100,
    $2: 200,
} as const;

export type ValidCoin = keyof typeof COIN_VALUES;

const VALID_COINS = Object.keys(COIN_VALUES);

export class ValidCoinSpecification {
    validateCoin(coin: string): coin is ValidCoin {
        return VALID_COINS.includes(coin);
    }
}
