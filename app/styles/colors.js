/**
 * Name: colors
 * Description:
 */
import { lighten, darken } from 'material-ui/utils/colorManipulator';

export const white = '#747c99';
export const brightWhite = lighten(white, 0.3);
export const black = '#1c1c1c';
export const orange = '#da8918';
export const darkBlue = '#0f1419';
export const midBlue = '#1a1f25';
export const lightBlue = '#596775';
export const vividBlue = '#03d5fe';

//
export const bg = darkBlue;
export const bg2 = midBlue;
// text
export const text = lightBlue;
export const darkText = darken(text, 0.2);
export const midText = lighten(text, 0.4);
export const lightText = lighten(text, 0.7);
export const brightText = lighten(text, 0.9);

//
export const red = '#B71C1C';
export const yellow = '#FFC107';
export const green = '#386939';
