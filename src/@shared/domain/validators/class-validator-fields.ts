import ValidatorFieldsInterface, {FieldsErrors} from "./validator-fields-interface";
import {validateSync} from "class-validator";

export abstract class ClassValidatorFields<PropsValidated> implements ValidatorFieldsInterface<PropsValidated> {
    errors: FieldsErrors = null;
    validateData: PropsValidated = null;

    validate(data: any): boolean {
        const errors = validateSync(data);
        if (errors.length) {
            this.errors = {};
            errors.forEach(error => {
                this.errors[error.property] = Object.values(error.constraints);
            });
        } else {
            this.validateData = data;
        }
        return !errors.length;
    }

}