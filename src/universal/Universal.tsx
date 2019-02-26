import axios from 'axios';
import * as React from 'react';
import showdown from 'showdown';

import config from '@@config';
import GlobalStyle from '@@components/GlobalStyle';
import Summary from '@@components/Summary/Summary';

const converter = new showdown.Converter();
console.log(123, config);

const d = `
#power

- boo
<p class='specialParagraph' markdown='1'>
**Another paragraph** which allows *Markdown* within it.
</p>
`;

axios.get(`${config.dataEndPoint}/ex1.md`)
  .then(({ data }) => {
    const x = converter.makeHtml(d);
    console.log(123, x);
  });

const Universal = () => {
  return (
    <>
      <GlobalStyle />
      <Summary />
    </>
  );
};

export default Universal;
