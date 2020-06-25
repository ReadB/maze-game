import { randInt } from '../src/utils';

//https://jestjs.io/docs/en/expect#expectextendmatchers
expect.extend({
    toBeWithinRange(received, floor, ceiling) {
        const pass = received >= floor && received <= ceiling;
        if (pass) {
            return {
                message: () =>
                    `expected ${received} not to be within range ${floor} - ${ceiling}`,
                pass: true,
            };
        } else {
            return {
                message: () =>
                    `expected ${received} to be within range ${floor} - ${ceiling}`,
                pass: false,
            };
        }
    },
});

it('randInt', () => {
    expect(randInt(100)).toBeWithinRange(0, 99);
    expect(randInt()).toBeWithinRange(0, 1);
});
