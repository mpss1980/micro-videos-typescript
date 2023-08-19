import {Category} from "./category";

describe('Category Tests', () => {

  it('constructor should be defined', () => {
    const category = new Category('Movie');
    expect(category.name).toBe('Movie');
  });

});