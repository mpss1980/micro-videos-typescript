import Category, {CategoryProperties} from "./category";
import {omit} from "lodash";
import {validate as uuidValidate} from "uuid";

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

    describe('id field', () => {
        type CategoryData = { props: CategoryProperties, id?: string };
        const arrange: CategoryData[] = [
            {props: {name: 'Movie'}},
            {props: {name: 'Movie'}, id: null},
            {props: {name: 'Movie'}, id: undefined},
            {props: {name: 'Movie'}, id: '4e59fadb-1a98-4c19-aeb8-8c45d382abca'},
        ];

        test.each(arrange)('When prop is %j', (item) => {
            let category = new Category(item.props, item.id as any);
            expect(uuidValidate(category.uniqueId)).toBeTruthy();
        });
    });

    test('name getter and setter', () => {
        const category = new Category({name: 'Movie'});
        expect(category.name).toBe('Movie');

        category['name'] = 'Other Movie';
        expect(category.name).toBe('Other Movie');
    });

    test('description getter and setter', () => {
        let category = new Category({name: 'Movie'});
        expect(category.description).toBeNull();

        category = new Category({name: 'Movie', description: 'Movie description'});
        expect(category.description).toBe('Movie description');

        category['description'] = 'Other Movie description';
        expect(category.description).toBe('Other Movie description');

        category['description'] = undefined;
        expect(category.description).toBeNull();

        category['description'] = null;
        expect(category.description).toBeNull();
    })

    test('isActive getter and setter', () => {
        let category = new Category({name: 'Movie'});
        expect(category.isActive).toBeTruthy();

        category = new Category({name: 'Movie', isActive: false});
        expect(category.isActive).toBeFalsy();

        category = new Category({name: 'Movie', isActive: true});
        expect(category.isActive).toBeTruthy();
    });

    test('createdAt getter', () => {
        let category = new Category({name: 'Movie'});
        expect(category.createdAt).toBeInstanceOf(Date);

        const createdAt = new Date();
        category = new Category({name: 'Movie', createdAt});
        expect(category.createdAt).toBe(createdAt);
    });

    it('should update a Category', () => {
        const category = new Category({name: 'Movie'});
        category.update('Documentary', 'Documentary description');
        expect(Category.validate).toHaveBeenCalledTimes(2);
        expect(category.name).toBe('Documentary');
        expect(category.description).toBe('Documentary description');
    });

    it('should active a category', () => {
        const category = new Category({name: 'Movie', isActive: false});
        category.activate();
        expect(category.isActive).toBeTruthy();
    });

    it('should disable a category', () => {
        const category = new Category({name: 'Movie', isActive: true});
        category.deactivate();
        expect(category.isActive).toBeFalsy();
    });
});