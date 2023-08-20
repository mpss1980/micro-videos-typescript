import {deepFreeze} from "./object";

describe('Object Tests', () => {

    it('should not freeze a scalar value', () => {
        const str = deepFreeze('value');
        expect(typeof str).toBe('string');

        let boolean = deepFreeze(true);
        expect(typeof boolean).toBe('boolean');

        boolean = deepFreeze(false);
        expect(typeof boolean).toBe('boolean');

        let num = deepFreeze(5);
        expect(typeof num).toBe('number');
    });

    it('should be an immutable object', () => {
        const obj = deepFreeze({
            prop: 'value', deep: {
                prop2: 'value2', prop3: new Date()
            }
        });

        expect(() => {
            (obj as any).prop = 'new value';
        }).toThrow(
            "Cannot assign to read only property 'prop' of object '#<Object>'"
        );

        expect(() => {
            (obj as any).deep.prop2 = 'new value';
        }).toThrow(
            "Cannot assign to read only property 'prop2' of object '#<Object>'"
        );

        expect(obj.deep.prop3).toBeInstanceOf(Date);
    });

});