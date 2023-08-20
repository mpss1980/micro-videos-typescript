import Category from "./category";
import ValidationError from "../../../@shared/domain/errors/validation.error";

describe('Category Integration Tests', () => {

    describe('Create a new category', () => {
        it('should throw a validation error when pass an invalid name', () => {
            expect(() => new Category({name: null}))
                .toThrow(new ValidationError('The property name is required'));

            expect(() => new Category({name: ''}))
                .toThrow(new ValidationError('The property name is required'));

            expect(() => new Category({name: 't'.repeat(256)}))
                .toThrow(new ValidationError('The property name must be less or equal than 255 characters'));

            expect(() => new Category({name: 6 as any}))
                .toThrow(new ValidationError('The property name must be a string'));
        });

        it('should throw a validation error when pass an invalid description', () => {
            expect(() => new Category({name: 'test', description: 't'.repeat(256)}))
                .toThrow(new ValidationError('The property description must be less or equal than 255 characters'));

            expect(() => new Category({name: 'test', description: 6 as any}))
                .toThrow(new ValidationError('The property description must be a string'));
        });

        it('should throw a validation error when pass an invalid isActive', () => {
            expect(() => new Category({name: 'test', isActive: 6 as any}))
                .toThrow(new ValidationError('The property isActive must be a boolean'));
        });

        it('should create a valid Category', () => {
            expect(() => new Category({name: 'Movie'})).not.toThrow();

            expect(() => new Category({name: 'Movie', description: 'Movie category'})).not.toThrow();

            expect(
                () => new Category({name: 'Movie', description: 'Movie category', isActive: false})
            ).not.toThrow();

            expect(
                () => new Category({name: 'Movie', description: 'Movie category', isActive: true})
            ).not.toThrow();
        });
    });

    describe('Update method', () => {
        it('should throw a validation error when pass an invalid name', () => {
            let category = new Category({name: 'Movie'});
            expect(() => category.update(null, null ))
                .toThrow(new ValidationError('The property name is required'));

            expect(() => category.update('', null))
                .toThrow(new ValidationError('The property name is required'));

            expect(() => category.update('t'.repeat(256), null))
                .toThrow(new ValidationError('The property name must be less or equal than 255 characters'));

            expect(() => category.update( 6 as any, null))
                .toThrow(new ValidationError('The property name must be a string'));
        });

        it('should throw a validation error when pass an invalid description', () => {
            let category = new Category({name: 'Movie'});

            expect(() => category.update('test', 't'.repeat(256)))
                .toThrow(new ValidationError('The property description must be less or equal than 255 characters'));

            expect(() => category.update('test', 6 as any))
                .toThrow(new ValidationError('The property description must be a string'));
        });

        it('should update and return a valid category', () => {
            const category = new Category({name: 'Movie'});

            expect(() => category.update('Other movie', null)).not.toThrow();
            expect(() => category.update('Other movie', 'some description')).not.toThrow();
        });
    });
});
