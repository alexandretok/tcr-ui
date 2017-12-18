import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    color: #2a2825;
  }

  body {
    font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  /* #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  } */

  p,
  label {
    line-height: 1.5em;
  }

  h4 {
    margin: 0;
  }
`;
