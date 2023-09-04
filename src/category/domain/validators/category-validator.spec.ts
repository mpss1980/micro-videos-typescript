import CategoryValidatorFactory, {CategoryValidator} from "./category-validator";

describe('CategoryValidator', () => {
    let validator: CategoryValidator;

    beforeEach(() =>
        (validator = CategoryValidatorFactory.create())
    );

    test('invalid cases for name field', () => {
        expect({validator, data: null}).containsErrorMessages({
            name: [
                'name should not be empty',
                'name must be a string',
                'name must be shorter than or equal to 255 characters',
            ],
        });
    });
});