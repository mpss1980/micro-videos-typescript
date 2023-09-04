import Category, {CategoryProperties} from "../entities/category";
import {ClassValidatorFields} from "../../../@shared/domain/validators/class-validator-fields";

export class CategoryRules {

}

export class CategoryValidator  extends ClassValidatorFields<CategoryRules>{
    validate(data: CategoryProperties): boolean {
        return true;
    }
}

export default class CategoryValidatorFactory{
    static create(): CategoryValidator {
        return new CategoryValidator();
    }
}