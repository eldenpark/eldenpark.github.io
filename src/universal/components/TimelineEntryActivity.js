const { format } = require('../utils/stringUtils');
const toStyle = require('../utils/sassc').toStyle;

const className = toStyle({
  name: 'TimelineEntryActivity',
  style: `
    margin-bottom: 7px;
    text-align: justify;
    .desc {
      .item-2 {
        padding-left: 12px;
      }

      b {
        font-weight: 500;
      }

      > li {
        display: flex;
        text-align: justify;
        &:before {
          content: '-';
          margin-right: 3px;
        }
      }
    }
    .meta {
      .separator {
        margin: 0 5px;
      }

      > span {
        margin-right: 0px;
      }
    }
  `,
});

const Separator = '<span class="separator">∙</span>'

const TimelineEntryActivity = ({ data, name }) => {
  const timeline = data.timeline[name];
  let desc = '';

  for (let i = 0; i < timeline.desc.length; i++) {
    if (Array.isArray(timeline.desc[i])) {
      for (let j = 0; j < timeline.desc[i].length; j++) {
        desc += format(`<li class="item-2"><p>%s</p></li>`, timeline.desc[i][j]);
      }
    } else {
      desc += format(`<li class="item-1"><p>%s</p></li>`, timeline.desc[i]);
    }
  }

  return `
    <div class="${className}">
      <div class="">
        ${format(`<b class="title">%s</b>`, timeline.fullname)}
      </div>
      <div class="meta">
        ${format(`<span class="time">%s</span>`, timeline.time)}
        ${Separator}
        ${format(`<span class="location">%s</span>`, timeline.location)}
      </div>
      ${format(`<p class="url">%s</span>`, timeline.url)}
      <ul class="desc">
        ${desc}
      </ul>
    </div>
  `;
}

module.exports = TimelineEntryActivity;
