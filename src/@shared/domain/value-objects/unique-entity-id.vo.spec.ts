import UniqueEntityId from "./unique-entity-id.vo";
import InvalidUuidError from "../errors/invalid-uuid.error";
import { validate as uuidValidate } from 'uuid';

describe('UniqueEntityId', () => {

    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');

    it ('should throw an error when uuid is invalid', () => {
        expect(() => new UniqueEntityId('fake id')).toThrow(new InvalidUuidError());
        expect(validateSpy).toHaveBeenCalled();
    });

    it ('should accept an uuid passed in constructor', () => {
        const uuid = '9366b7dc-2d71-4799-b91c-c64adb205104';
        const valueObject = new UniqueEntityId(uuid);
        expect(valueObject.value).toBe(uuid);
        expect(validateSpy).toHaveBeenCalled();
    });

    it('should generate an uuid when no uuid is passed in constructor', () => {
        const valueObject = new UniqueEntityId();
        expect(uuidValidate(valueObject.value)).toBeTruthy();
        expect(validateSpy).toHaveBeenCalled();
    });
});