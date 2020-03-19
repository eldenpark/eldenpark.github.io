import { CSSObject } from 'styled-components';

export function w320(cssObject: CSSObject) {
  return {
    '@media (max-width: 480px)': cssObject,
  };
}
