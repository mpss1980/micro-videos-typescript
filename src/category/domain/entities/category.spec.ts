import Category from "./category";
import {omit} from "lodash";

describe('Category Unit Test', () => {

    beforeEach(() => {
        Category.validate = jest.fn();
    });

    test('Category constructor', () => {
        let category = new Category({name: 'Movie'});
        let props = omit(category.props, 'createdAt');

        expect(Category.validate).toHaveBeenCalled();
        expect(props).toStrictEqual({
            name: 'Movie',
            description: null,
            isActive: true,
        });
        expect(category.props.createdAt).toBeInstanceOf(Date);

        let createdAt = new Date();
        category = new Category({
            name: 'Movie',
            description: 'Movie description',
            isActive: false,
            createdAt,
        });
        expect(category.props).toStrictEqual({
            name: 'Movie',
            description: 'Movie description',
            isActive: false,
            createdAt,
        });

        category = new Category({
            name: 'Movie',
            description: 'other description',
        });
        expect(category.props).toMatchObject({
            name: 'Movie',
            description: 'other description',
        });

        category = new Category({
            name: 'Movie',
            isActive: true,
        });
        expect(category.props).toMatchObject({
            name: 'Movie',
            isActive: true,
        });

        createdAt = new Date();
        category = new Category({
            name: 'Movie',
            createdAt,
        });
        expect(category.props).toMatchObject({
            name: 'Movie',
            createdAt,
        });
    });
});