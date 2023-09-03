export default class InvalidUuidError extends Error {
    constructor(message?: string) {
        super(message || 'Id must be a valid uuid.');
        this.name = 'InvalidUuidError';
    }
}