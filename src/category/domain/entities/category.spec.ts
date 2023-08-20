import {omit} from 'lodash';
import UniqueEntityId from "../../../@shared/domain/value-objects/unique-entity-id";
import Category from "./category";



describe('Category Tests', () => {

    beforeEach(() => {
        Category.validate = jest.fn();
    });

    test('Category constructor', () => {
        let category = new Category({name: 'Movie'});
        let props = omit(category.props, 'createdAt');

        expect(Category.validate).toHaveBeenCalled();

        expect(props).toStrictEqual({
            name: 'Movie',
            isActive: true,
            description: null,
        });
        expect(category.createdAt).toBeInstanceOf(Date);

        let createdAt = new Date();

        category = new Category({name: 'Movie', isActive: false, description: 'Movie category', createdAt});
        expect(category.props).toStrictEqual({
            name: 'Movie',
            isActive: false,
            description: 'Movie category',
            createdAt,
        });

        category = new Category({name: 'Movie', description: 'Other movie category'});
        expect(category.props).toMatchObject({
            name: 'Movie',
            description: 'Other movie category',
        });

        category = new Category({name: 'Movie', isActive: true});
        expect(category.props).toMatchObject({
            name: 'Movie',
            isActive: true,
        });

        category = new Category({name: 'Movie', createdAt: createdAt});
        expect(category.props).toMatchObject({
            name: 'Movie',
            createdAt
        });
    });

    test('id field', () => {
        let category = new Category({name: 'Movie'});
        expect(category.id).not.toBeNull();
        expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);

        category = new Category({name: 'Movie'}, null);
        expect(category.id).not.toBeNull();
        expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);

        category = new Category({name: 'Movie'}, undefined);
        expect(category.id).not.toBeNull();
        expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);

        category = new Category({name: 'Movie'}, new UniqueEntityId('123e4567-e89b-12d3-a456-426614174000'));
        expect(category.id).not.toBeNull();
        expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    });

    test('name getter and setter', () => {
        const category = new Category({name: 'Movie'});
        expect(category.name).toBe('Movie');

        category['name'] = 'Other movie';
        expect(category.name).toBe('Other movie');
    });

    test('description getter and setter', () => {
        let category = new Category({name: 'Movie'});
        expect(category.description).toBeNull();

        category = new Category({name: 'Movie', description: 'Movie category'});
        expect(category.description).toBe('Movie category');

        category['description'] = 'Other movie category';
        expect(category.description).toBe('Other movie category');

        category['description'] = undefined;
        expect(category.description).toBeNull();

        category['description'] = null;
        expect(category.description).toBeNull();
    });

    test('isActive getter', () => {
        let category = new Category({name: 'Movie'});
        expect(category.isActive).toBeTruthy();

        category = new Category({name: 'Movie', isActive: true});
        expect(category.isActive).toBeTruthy();

        category = new Category({name: 'Movie', isActive: false});
        expect(category.isActive).toBeFalsy();

        category = new Category({name: 'Movie', isActive: undefined});
        expect(category.isActive).toBeTruthy();

        category = new Category({name: 'Movie', isActive: null});
        expect(category.isActive).toBeTruthy();
    });

    test('createdAt getter', () => {
        let category = new Category({name: 'Movie'});
        expect(category.createdAt).toBeInstanceOf(Date);

        const createdAt = new Date();
        category = new Category({name: 'Movie', createdAt});
        expect(category.createdAt).toBe(createdAt);
    });

    test('update method', () => {
        const category = new Category({name: 'Movie'});
        category.update('Other movie', 'Other movie category');

        expect(Category.validate).toHaveBeenCalledTimes(2);
        expect(category.name).toBe('Other movie');
        expect(category.description).toBe('Other movie category');
    });

    test('activate method', () => {
        let category = new Category({name: 'Movie', isActive: false});
        category.activate();
        expect(category.isActive).toBeTruthy();

        category = new Category({name: 'Movie', isActive: true});
        category.activate();
        expect(category.isActive).toBeTruthy();
    });

    test('deactivate method', () => {
        let category = new Category({name: 'Movie', isActive: false});
        category.deactivate();
        expect(category.isActive).toBeFalsy();

        category = new Category({name: 'Movie', isActive: true});
        category.deactivate();
        expect(category.isActive).toBeFalsy();
    });

});