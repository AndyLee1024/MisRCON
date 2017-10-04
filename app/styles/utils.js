/**
 * Name: utils
 * Description:
 */
import { css } from 'styled-components';

export const media = {
  small: (...args) => css`
    @media (max-width: 150px) {
      ${css(...args)}
    }
  `
};
