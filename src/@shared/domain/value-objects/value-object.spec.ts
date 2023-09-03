import ValueObject from "./value-object";

class StubValueObject extends ValueObject {
}

describe('ValueObject', () => {
    it('should set value', () => {
        let valueObject = new StubValueObject('test');
        expect(valueObject.value).toBe('test');

        valueObject = new StubValueObject({prop: 'test'});
        expect(valueObject.value).toEqual({prop: 'test'});
    });

    describe('should convert to a string', () => {
        const date = new Date();
        let arrange = [
            {received: '', expected: ''},
            {received: 'test', expected: 'test'},
            {received: 0, expected: '0'},
            {received: 1, expected: '1'},
            {received: 1.1, expected: '1.1'},
            {received: true, expected: 'true'},
            {received: false, expected: 'false'},
            {received: date, expected: date.toString()},
            {received: {prop: 'test'}, expected: JSON.stringify({prop: 'test'})},
        ];

        test.each(arrange)('from $received to $expected',
            ({received, expected}) => {
            const valueObject = new StubValueObject(received);
            expect(valueObject + '').toBe(expected);
        });
    });

    it('should be an immutable object', () => {
        const object = {
            prop: 'test',
            deep: { prop2: 'test2', prop3: new Date()}
        }
        const valueObject = new StubValueObject(object);

        expect(() => {
            (valueObject as any).value.prop = 'any test';
        }).toThrow(
            'Cannot assign to read only property \'prop\' of object \'#<Object>\''
        );

        expect(() => {
            (valueObject as any).value.deep.prop2 = 'any test';
        }).toThrow(
            'Cannot assign to read only property \'prop2\' of object \'#<Object>\''
        );

        expect(valueObject.value.deep.prop3).toBeInstanceOf(Date);
    });
});
