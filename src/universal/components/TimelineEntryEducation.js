const { format } = require('../utils/stringUtils');
const toStyle = require('../utils/sassc').toStyle;

const className = toStyle({
  name: 'TimelineEntryEducation',
  style: `
    margin-bottom: 0px;
    .time {
      display: inline-block;
      width: 84px;
    }
    .desc {}
  `,
});

const TimelineEntryEducation = ({ data, name }) => {
  const timeline = data.timeline[name];

  return `
    <div class="${className}">
      <span class="time">${timeline.time}</span>
      <span class="desc">${timeline.desc[0]}</span>
    </div>
  `;
};

module.exports = TimelineEntryEducation;
