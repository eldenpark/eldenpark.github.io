import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle<any>`
  * {
    box-sizing: border-box;
    &:focus {
      outline: none;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
    &:focus, &:hover {
      cursor: pointer;
    }
  }

  button {
    background-color: transparent;
    border: 1px;
    &:focus {
      outline: 0;
    }
  }

  body, html {
    font-family: 'Apple SD Gothic Neo', AppleGothic, 'Droid sans', 'Malgun Gothic', '돋움', Dotum, '굴림', Gulim, sans-serif;
    font-size: 14px;
    display: flex;
    height: 100%;
    line-height: 1.15;
    margin: 0;
    padding: 0;
    width: 100vw;
  }

  html {
    overflow: scroll;
  }

  body {
    overflow: visible;
  }

  form {
    margin-bottom: 0;
  }

  input {
    border: none;
    outline: none;
  }

  li {
    margin: 0px;
    padding: 0px;
  }

  p {
    padding: 0;
    margin: 0;
  }

  select, textarea, button, input {
    line-height: 1;
    &:focus {
      outline: 0;
    }
  }

  table {
    border-collapse: collapse;
    color: inherit;
    font-size: inherit;
  }

  ul {
    list-style-type: none;
    margin: 0px;
    padding: 0px;
  }

  #app-root {
    overflow: visible;
  }
`;

export default GlobalStyle;
