import { Rule } from '@sanity/types';

const blog = {
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID',
      type: 'string',
      description: 'Unique identifier for the blog',
      validation: (rule: Rule) => rule.required().error('ID is required'),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title of the blog post',
      validation: (rule: Rule) => rule.required().error('Title is required'),
    },
    {
      name: 'dateCreated',
      title: 'Date Created',
      type: 'datetime',
      description: 'The date when the blog was created',
      validation: (rule: Rule) => rule.required().error('Creation date is required'),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A short description of the blog post',
      validation: (rule: Rule) => rule.required().error('Description is required'),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Main image for the blog post',
      options: {
        hotspot: true, // Enables image cropping in the Sanity Studio
      },
      validation: (rule: Rule) => rule.required().error('Image is required'),
    },
  ],
};

export default blog;
