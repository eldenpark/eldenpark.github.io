const { format } = require('../utils/stringUtils');
const toStyle = require('../utils/sassc').toStyle;

const className = toStyle({
  name: 'TimelineEntryEmployment', 
  style: `
    margin-bottom: 7px;
    .meta {
      > span {
        margin-right: 0px;
      }
    }
`});

const TimelineEntryEmployment = ({ data, name }) => {
  const timeline = data.timeline[name];

  return `
    <div class="${className}">
      <div class="weight-500">
        <span class="title">${timeline.role}</span>
      </div>
      <div class="meta">
        ${format(`<span class="role">%s</span>`, timeline.fullname)}
        ${format(`<span class="time">, %s</span>`, timeline.time)}
        ${format(`<span class="location">, %s</span>`, timeline.location)}
      </div>
      ${format(`<p class="url">%s</span>`, timeline.url)}
      <ul class="desc">
        ${format(`<li class="item"><p>%s</p></span>`, timeline.desc.a)}
        ${format(`<li class="item"><p>%s</p></span>`, timeline.desc.b)}
      </ul>
    </div>
  `;
}

module.exports = TimelineEntryEmployment;
