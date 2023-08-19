import {Category} from "./category";
import {omit} from 'lodash';
import UniqueEntityId from "../../../@shared/domain/unique-entity-id";

describe('Category Tests', () => {

    test('Category constructor', () => {
        let category = new Category({name: 'Movie'});
        let props = omit(category.props, 'createdAt');

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
        expect(category.id).toBeInstanceOf(UniqueEntityId);

        category = new Category({name: 'Movie'}, null);
        expect(category.id).not.toBeNull();
        expect(category.id).toBeInstanceOf(UniqueEntityId);

        category = new Category({name: 'Movie'}, undefined);
        expect(category.id).not.toBeNull();
        expect(category.id).toBeInstanceOf(UniqueEntityId);

        category = new Category({name: 'Movie'}, new UniqueEntityId('123e4567-e89b-12d3-a456-426614174000'));
        expect(category.id).not.toBeNull();
        expect(category.id).toBeInstanceOf(UniqueEntityId);
    });

    test('name getter', () => {
        const category = new Category({name: 'Movie'});
        expect(category.name).toBe('Movie');
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

    test('isActive getter and setter', () => {
        let category = new Category({name: 'Movie'});
        expect(category.isActive).toBeTruthy();

        category = new Category({name: 'Movie', isActive: true});
        expect(category.isActive).toBeTruthy();

        category = new Category({name: 'Movie', isActive: false});
        expect(category.isActive).toBeFalsy();

        category['isActive'] = true;
        expect(category.isActive).toBeTruthy();

        category['isActive'] = undefined;
        expect(category.isActive).toBeTruthy();

        category['isActive'] = null;
        expect(category.isActive).toBeTruthy();
    });

    test('createdAt getter', () => {
        let category = new Category({name: 'Movie'});
        expect(category.createdAt).toBeInstanceOf(Date);

        const createdAt = new Date();
        category = new Category({name: 'Movie', createdAt});
        expect(category.createdAt).toBe(createdAt);
    });

});