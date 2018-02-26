const TimelineSection = ({ data, name }) => `
<div class="timeline-section">
  <div class="weight-500">
    <span class="jobname">${data.timeline[name].fullname}</span>
    ${data.timeline[name].role ? `<span class="role">${data.timeline[name].role}</span>` : ''}
  </div>
  <div class="line">
    <span class="time">${data.timeline[name].time}</span>
    <span classs="location">${data.timeline[name].location}</span>
  </div>
  ${data.timeline[name].url ? `<p class="url">${data.timeline[name].url}</p>` : ''}
  <ul class="desc">
    ${ data.timeline[name].desc.a ? `<li class="item"><p>${data.timeline[name].desc.a}</p></li>` : ''}
    ${ data.timeline[name].desc.b ? `<li class="item"><p>${data.timeline[name].desc.b}</p></li>` : ''}
  </p>
</div>
`;

module.exports = TimelineSection;
