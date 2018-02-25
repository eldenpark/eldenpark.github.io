const data = require('../data/data');
const Wrapper = require('../components/Wrapper');
const Summary = require('../components/Summary');
const Timeline = require('../components/Timeline');

const config = {
  /**
   * Navigation entry which is active,
   */
  navigation: 'timeline',
};

const html = Wrapper(data, {
  summary: `${Summary(data, config)}`,
  body: `${Timeline(data)}`,
});

module.exports = html;
