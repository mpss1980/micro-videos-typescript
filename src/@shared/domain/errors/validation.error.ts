import {FieldsErrors} from "../validators/validator-fields.interface";

export abstract class BaseValidationError extends Error {
    protected constructor(public error: FieldsErrors = {}, message = 'Validation Error') {
        super(message);
    }

    setFromError(field: string, error: Error) {
        if (error) {
            this.error[field] = [error.message];
        }
    }

    count() {
        return Object.keys(this.error).length;
    }
}

export class EntityValidationError extends BaseValidationError {
    constructor(error: FieldsErrors = {}) {
        super(error, 'Entity Validation Error');
        this.name = 'EntityValidationError';
    }
}