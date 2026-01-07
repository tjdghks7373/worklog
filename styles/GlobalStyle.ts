'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;
    font-size: 14px;
    line-height: 1.4;
    background: #fafafa;
    color: #111;
  }

  h1, h2, h3, h4, h5, h6,
  p, ul, ol, li {
    margin: 0;
    padding: 0;
  }

  ul, ol {
    list-style: none;
  }

  button {
    font-family: inherit;
    border: none;
    background: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyle;
