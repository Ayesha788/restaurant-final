import { Rule } from 'sanity';

export default {
  name: 'foodCategory',
  title: 'Food Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Category Name',
      type: 'string',
      description: 'Name of the food category (e.g., Appetizers, Desserts, Beverages).',
      validation: (rule: Rule) => rule.required().min(3).max(50),
    },
    
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'An optional image representing this food category.',
      options: {
        hotspot: true, 
      },
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Unique identifier for the category, used in URLs.',
      options: {
        source: 'name', // Auto-generates the slug from the name
        maxLength: 96,
      },
      validation: (rule: Rule) => rule.required(),
    },
  ],
} as const;
