import {deepFreeze} from "./object";

describe('Object', () => {
    it('should not freeze a scalar value', () => {
        const str = deepFreeze('test');
        expect(typeof str).toBe('string');

        let boolean = deepFreeze(true);
        expect(typeof boolean).toBe('boolean');
        boolean = deepFreeze(false);
        expect(typeof boolean).toBe('boolean');

        const num = deepFreeze(1);
        expect(typeof num).toBe('number');
    });

    it('should be an immutable object', () => {
        const obj = deepFreeze({
            prop: 'test',
            deep: {prop2: 'test2', prop3: new Date()}
        });

        expect(() => {
            (obj as any).prop = 'any test';
        }).toThrow(
            'Cannot assign to read only property \'prop\' of object \'#<Object>\''
        );

        expect(() => {
            (obj as any).deep.prop2 = 'any test';
        }).toThrow(
            'Cannot assign to read only property \'prop2\' of object \'#<Object>\''
        );

        expect(obj.deep.prop3).toBeInstanceOf(Date);
    });
});