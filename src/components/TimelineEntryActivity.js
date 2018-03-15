const { format } = require('../utils/stringUtils');
const toStyle = require('../utils/sassc').toStyle;

const className = toStyle({
  name: 'TimelineEntryActivity',
  style: `
    margin-bottom: 7px;
  `,
});

const TimelineEntryActivity = ({ data, name }) => {
  const timeline = data.timeline[name];

  return `
    <div class="${className}">
      <div class="">
        ${format(`<span class="actName">%s</span>`, timeline.fullname)}
        ${format(`<span class="role">; %s</span>`, timeline.role)}
        ${format(`<span class="location">; %s</span>`, timeline.location)}
        ${format(`<span class="time">&nbsp;(%s)</span>`, timeline.time)}
      </div>
      ${format(`<p class="url">%s</span>`, timeline.url)}
      <ul class="desc">
        ${format(`<li class="item"><p>%s</p></li>`, timeline.desc.a)}
        ${format(`<li class="item"><p>%s</p></li>`, timeline.desc.b)}
      </ul>
    </div>
  `;
}

module.exports = TimelineEntryActivity;
