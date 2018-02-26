const TimelineSection = require('./TimelineSection');

const Timeline = (data) => `
<div class="timeline" class="border-black">
  <p class="head-title">Timeline</p>
  <p class="head-title-divider">∙∙∙</p>
  <div class="timeline-entry">
    <p class="entry-title">Employment</p>
    ${TimelineSection({data, name: 'memebox'})}
    ${TimelineSection({data, name: 'naver'})}
    ${TimelineSection({data, name: 'zoyi'})}
    ${TimelineSection({data, name: 'lgcns'})}
    ${TimelineSection({data, name: 'bagdar'})}
  </div>
  <div class="timeline-entry">
    <p class="entry-title">Engineering</p>
    ${TimelineSection({data, name: 'marmoym'})}
    ${TimelineSection({data, name: 'gimci'})}
    ${TimelineSection({data, name: 'swmaestro'})}
  </div>
  <div class="timeline-entry">
    <p class="entry-title">Other Activities</p>
    ${TimelineSection({data, name: 'gokathon'})}
    ${TimelineSection({data, name: 'unesco'})}
    ${TimelineSection({data, name: 'nepal'})}
    ${TimelineSection({data, name: 'military'})}
  </div>
  <div class="timeline-entry">
    <p class="entry-title">Education</p>
    ${TimelineSection({data, name: 'koreauniv'})}
    ${TimelineSection({data, name: 'univofutah'})}
  </div>
</div>
`;

module.exports = Timeline;
