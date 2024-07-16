import StyleDictionary from 'style-dictionary';
import { registerTransforms } from '@tokens-studio/sd-transforms';

// sd-transforms, 2nd parameter for options can be added
// See docs: https://github.com/tokens-studio/sd-transforms
register(StyleDictionary, {
  expand: {
    composition: false,
    typography: false,
    border: false,
    shadow: false,
  },
  excludeParentKeys: true,
});

const sd = new StyleDictionary({
  source: ['tokens.json'],
  preprocessors: ['tokens-studio'],
  platforms: {
    css: {
      buildPath: 'build/css/',
      prefix: 'rd',
      transformGroup: 'tokens-studio',
      transforms: ['name/kebab'],
      files: [
        {
          destination: '_variables.css',
          format: 'css/variables',
        },
      ],
    },
    scss: {
      buildPath: 'build/scss/',
      prefix: 'rd',
      transformGroup: 'scss',
      files: [
        {
          destination: 'variables.scss',
          format: 'scss/variables',
        },
      ],
    },
  },
});
// optionally, cleanup files first..
await sd.cleanAllPlatforms();
await sd.buildAllPlatforms();
