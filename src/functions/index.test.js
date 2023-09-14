import { add, divide, multiply, subtract } from ".";

describe('Test Functions', () =>
{
    it('Add 2 + 2', () =>
    {
        expect(add(2, 2)).toBe(4);
    });

    it('add Null + Null = Error', () =>
    {
        expect(add(null, null)).toBe("Error");
    });

    it('subtract Null + Null = Error', () =>
    {
        expect(subtract(null, null)).toBe("Error");
    });

    it('Subtract 2 - 2', () =>
    {
        expect(subtract(2, 2)).toBe(0);
    });

    it('Multiply 2 * 2', () =>
    {
        expect(multiply(2, 2)).toBe(4);
    });

    it('Divide 2 / 2', () =>
    {
        expect(divide(2, 2)).toBe(1);
    });
});