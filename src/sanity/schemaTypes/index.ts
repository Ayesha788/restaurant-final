import { type SchemaTypeDefinition } from 'sanity';
import chef from './chefs';
import food from './foods';
import blog from './blog';
import foodcategory from './category'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [food, chef,blog,foodcategory],
};
