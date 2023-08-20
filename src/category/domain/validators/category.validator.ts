import ValidatorFieldsInterface from "../../../@shared/domain/validators/validator-fields-interface";
import {ClassValidatorFields} from "../../../@shared/domain/validators/class-validator-fields";
import {CategoryProperties} from "../entities/category";
import {IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, MaxLength} from "class-validator";

export class CategoryRules {
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string;

    @MaxLength(255)
    @IsString()
    @IsOptional()
    description: string;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;

    @IsDate()
    @IsOptional()
    createdAt: Date;

    constructor({name, description, isActive, createdAt}: CategoryProperties) {
        Object.assign(this, {name, description, isActive, createdAt});
    }
}

export class CategoryValidator extends ClassValidatorFields<CategoryRules> {

    validate(data: CategoryProperties): boolean {
        return super.validate(new CategoryRules(data));
    }
}

export default class CategoryValidatorFactory{
    static create(): ValidatorFieldsInterface<CategoryRules> {
        return new CategoryValidator();
    }
};