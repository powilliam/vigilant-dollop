import { storyblok } from 'app/shared/providers/storyblok';

export const getAuthors = async () =>
  await storyblok.get('cdn/stories', {
    starts_with: 'authors',
  });
