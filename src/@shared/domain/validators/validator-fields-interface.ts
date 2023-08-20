export type FieldsErrors = {
   [fields: string]: string[];
}

export default interface ValidatorFieldsInterface<PropsValidated> {
    errors: FieldsErrors;
    validateData: PropsValidated;
    validate(data: any): boolean;
}