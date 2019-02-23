const data = require('../data/data');
// const globalStyle = require('../utils/sassc').globalStyle;
const Summary = require('../components/Summary');
const toStyle = require('../utils/sassc').toStyle;
const Timeline = require('../components/Timeline');
const Wrapper = require('../components/Wrapper');

const normalize = require('../styles/normalize');
toStyle({
  global: true,
  style: normalize,
});
toStyle({
  global: true,
  style: `
    * {
      box-sizing: border-box;
    }

    html, body {
      padding: 0;
      margin: 0;
      height: 100%;
      font-size: 14px;
      font-family: 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.4;
      min-width: 320px;
    }

    p {
      margin: 0;
      padding: 0;
    }

    a {
      text-decoration: underline;
      color: #7f7b66;
      &:visited {
        color: #7f7b66;
      }
    }

    ul, li {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .weight-500 {
      font-weight: 500;
    }

    `,
});

const config = {
  /**
   * Navigation entry which is active,
   */
  navigation: 'timeline',
};

const html = Wrapper({
  components: {
    summary: `${Summary(data, config)}`,
    body: `${Timeline(data)}`,
  },
  data, 
});

module.exports = html;
