import UniqueEntityId from "./unique-entity-id";
import InvalidUuidError from "../errors/invalid-uuid.error";
import {validate as uuidValidate} from 'uuid';

describe('UniqueEntityId Tests', () => {

    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');
    beforeEach(() => validateSpy.mockClear());

    it('should throw error when uuid is invalid', () => {
        expect(() => new UniqueEntityId('invalid-uuid')).toThrow(InvalidUuidError);
        expect(validateSpy).toHaveBeenCalled();
    });

    it('should accept an uuid passed in constructor', () => {
        const id = '123e4567-e89b-12d3-a456-426614174000';
        const valueObject = new UniqueEntityId(id);

        expect(valueObject.id).toBe(id);
        expect(validateSpy).toHaveBeenCalled();
    });

    it('should generate a valid uuid if not passed any in constructor', () => {
        const valueObject = new UniqueEntityId();

        expect(uuidValidate(valueObject.id)).toBeTruthy();
        expect(validateSpy).toHaveBeenCalled();
    });
})