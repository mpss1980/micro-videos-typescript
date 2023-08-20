import ValueObject from "./value-object";
import {deepFreeze} from "../utils/object";

class StubValueObject extends ValueObject {
}

describe('ValueObject Tests', () => {

    it('should set value', () => {
        let valueObject = new StubValueObject('value');
        expect(valueObject.value).toBe('value');

        valueObject = new StubValueObject({prop: 'value'});
        expect(valueObject.value).toStrictEqual({prop: 'value'});
    });

    it('should convert to string', () => {
        let valueObject = new StubValueObject('');
        expect(valueObject + "").toBe('');

        valueObject = new StubValueObject('some value');
        expect(valueObject + "").toBe('some value');

        valueObject = new StubValueObject(0);
        expect(valueObject + "").toBe('0');

        valueObject = new StubValueObject(false);
        expect(valueObject + "").toBe('false');

        const date = new Date();
        valueObject = new StubValueObject(date);
        expect(valueObject + "").toBe(date.toString());

        const obj = {prop: 'value'};
        valueObject = new StubValueObject(obj);
        expect(valueObject + "").toBe(JSON.stringify(obj));
    });

    it('should be an immutable object', () => {
        const obj = deepFreeze({
            prop: 'value', deep: {
                prop2: 'value2', prop3: new Date()
            }
        });
        const valueObject = new StubValueObject(obj);

        expect(() => {
            (valueObject as any).value.prop = 'new value';
        }).toThrow(
            "Cannot assign to read only property 'prop' of object '#<Object>'"
        );

        expect(() => {
            (valueObject as any).value.deep.prop2 = 'new value';
        }).toThrow(
            "Cannot assign to read only property 'prop2' of object '#<Object>'"
        );

        expect(valueObject.value.deep.prop3).toBeInstanceOf(Date);
    });

});