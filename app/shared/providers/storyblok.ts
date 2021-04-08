import Storyblok from 'storyblok-js-client';
import Config from 'react-native-config';

export const storyblok = new Storyblok({
  accessToken: Config.STORYBLOK_PUBLIC_KEY,
});
