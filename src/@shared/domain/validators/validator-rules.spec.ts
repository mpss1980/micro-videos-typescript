import ValidatorRules from "./validator-rules";
import ValidationError from "../errors/validation.error";

describe('ValidatorRules', () => {

    test('values method', () => {
        const validator = ValidatorRules.values('some value', 'field');

        expect(validator).toBeInstanceOf(ValidatorRules);
        expect(validator).toHaveProperty('value', 'some value');
        expect(validator).toHaveProperty('property', 'field');
    });

    test('required method', () => {
        expect(() => ValidatorRules.values(null, 'field').required())
            .toThrowError('The property field is required');

        expect(() => ValidatorRules.values(undefined, 'field').required())
            .toThrowError('The property field is required');

        expect(() => ValidatorRules.values('', 'field').required())
            .toThrowError('The property field is required');

        expect(() => ValidatorRules.values('some value', 'field').required())
            .not.toThrow();

        expect(() => ValidatorRules.values(0, 'field').required())
            .not.toThrow();

        expect(() => ValidatorRules.values(false, 'field').required())
            .not.toThrow();
    });

    test('string method', () => {
        expect(() => ValidatorRules.values(0, 'field').string())
            .toThrowError('The property field must be a string');

        expect(() => ValidatorRules.values(false, 'field').string())
            .toThrowError('The property field must be a string');

        expect(() => ValidatorRules.values({}, 'field').string())
            .toThrowError('The property field must be a string');

        expect(() => ValidatorRules.values('some value', 'field').string())
            .not.toThrow();

        expect(() => ValidatorRules.values(null, 'field').string())
            .not.toThrow();

        expect(() => ValidatorRules.values(undefined, 'field').string())
            .not.toThrow();
    });

    test('maxLength method', () => {
        expect(() => ValidatorRules.values('some value', 'field').maxLength(3))
            .toThrowError('The property field must be less or equal than 3 characters');

        expect(() => ValidatorRules.values('some value', 'field').maxLength(10))
            .not.toThrow();

        expect(() => ValidatorRules.values('some value', 'field').maxLength(12))
            .not.toThrow();

        expect(() => ValidatorRules.values(null, 'field').string())
            .not.toThrow();

        expect(() => ValidatorRules.values(undefined, 'field').string())
            .not.toThrow();
    });

    test('boolean method', () => {
        expect(() => ValidatorRules.values('false', 'field').boolean())
            .toThrowError('The property field must be a boolean');

        expect(() => ValidatorRules.values('true', 'field').boolean())
            .toThrowError('The property field must be a boolean');

        expect(() => ValidatorRules.values(0, 'field').boolean())
            .toThrowError('The property field must be a boolean');

        expect(() => ValidatorRules.values({}, 'field').boolean())
            .toThrowError('The property field must be a boolean');

        expect(() => ValidatorRules.values(false, 'field').boolean())
            .not.toThrow();

        expect(() => ValidatorRules.values(true, 'field').boolean())
            .not.toThrow();

        expect(() => ValidatorRules.values(null, 'field').string())
            .not.toThrow();

        expect(() => ValidatorRules.values(undefined, 'field').string())
            .not.toThrow();
    });

    it('should throw a validation error when combine two or more validation rules ', () => {
        expect(
            () => ValidatorRules.values(null, 'field').required().string().maxLength(5)
        ).toThrowError('The property field is required');

        expect(
            () => ValidatorRules.values(5, 'field').required().string().maxLength(5)
        ).toThrowError('The property field must be a string');

        expect(
            () => ValidatorRules.values('some value', 'field').required().string().maxLength(5)
        ).toThrowError('The property field must be less or equal than 5 characters');

        expect(
            () => ValidatorRules.values(null, 'field').required().boolean()
        ).toThrowError('The property field is required');

        expect(
            () => ValidatorRules.values(5, 'field').required().boolean()
        ).toThrowError('The property field must be a boolean');
    });

    it('should validate when combine two or more validation rules', () => {
        expect(
            () => ValidatorRules.values('some value', 'field')
                .required().string().maxLength(20)
        ).not.toThrow();

        expect(
            () => ValidatorRules.values('some value', 'field').required().string()
        ).not.toThrow();

        expect(
            () => ValidatorRules.values(true, 'field').required().boolean()
        ).not.toThrow();

        expect(
            () => ValidatorRules.values(false, 'field').required().boolean()
        ).not.toThrow();
    });

});