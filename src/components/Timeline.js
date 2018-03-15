const { format } = require('../utils/stringUtils');
const toStyle = require('../utils/sassc').toStyle;
const TimelineEntryActivity = require('./TimelineEntryActivity');
const TimelineEntryEducation = require('./TimelineEntryEducation');
const TimelineEntryEmployment = require('./TimelineEntryEmployment');

const className = toStyle({
  name: 'timeline', 
  style: `
    a {
      color: black;
      &:visited {
        color: black;
      }
    }

    b {
      color: #1b1b1b;
      &:visited {
        color: #1b1b1b;
      }
    }

    .timeline-section {
      margin-bottom: 29px;
    }
  
    .section-title {
      font-size: 17px;
      font-weight: bold;
      margin-bottom: 8px;
    }

    .url {
      font-size: 12px;
      margin-bottom: 2px;
    }

    .desc {
      > li {
        display: flex;
        text-align: justify;
        &:before {
          content: '-';
          margin-right: 3px;
        }
      }
    }

    .actName {
      font-weight: 500;
    }
`});

const Timeline = (data) => `
<div class="${className}">
  <p class="head-title">Timeline</p>
  <p class="head-title-divider">∙∙∙</p>
  <div class="timeline-section">
    <p class="section-title">Employment</p>
    ${TimelineEntryEmployment({data, name: 'memebox'})}
    ${TimelineEntryEmployment({data, name: 'naver'})}
    ${TimelineEntryEmployment({data, name: 'zoyi'})}
    ${TimelineEntryEmployment({data, name: 'lgcns'})}
    ${TimelineEntryEmployment({data, name: 'bagdar'})}
  </div>
  <div class="timeline-section">
    <p class="section-title">Engineering and Research</p>
    ${TimelineEntryActivity({data, name: 'marmoym'})}
    ${TimelineEntryActivity({data, name: 'gimci'})}
    ${TimelineEntryActivity({data, name: 'swmaestro'})}
  </div>
  <div class="timeline-section">
    <p class="section-title">Other Activities</p>
    ${TimelineEntryActivity({data, name: 'gokathon'})}
    ${TimelineEntryActivity({data, name: 'fieldStudySV'})}
    ${TimelineEntryActivity({data, name: 'unesco'})}
    ${TimelineEntryActivity({data, name: 'nepal'})}
    ${TimelineEntryActivity({data, name: 'military'})}
    ${TimelineEntryActivity({data, name: 'lyonBleu'})}
  </div>
  <div class="timeline-section">
    <p class="section-title">Education</p>
    ${TimelineEntryEducation({data, name: 'koreauniv'})}
    ${TimelineEntryEducation({data, name: 'univofutah'})}
  </div>
</div>
`;

module.exports = Timeline;
