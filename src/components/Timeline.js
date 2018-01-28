const Timeline = (data) => `
<div class="timeline" class="border-black">
  <div class="timeline-entry">
    <p class="p-title">Employment</p>
    <div class="section">
      <p class="jobname">${data.timeline.naver.fullname}</p>
      <p class="meta">
        <span>${data.timeline.naver.location}</span>
        <span>${data.timeline.naver.time}</span>
      </p>
      <p class="role">${data.timeline.naver.role}</p>
      <p class="url">${data.timeline.naver.url}</p>
      <ul class="desc">
        <li class="item"><p>${data.timeline.naver.desc.a}</p></li>
        <li class="item"><p>${data.timeline.naver.desc.b}</p></li>
      </p>
    </div>
    <div class="section">
      <p class="jobname">${data.timeline.zoyi.fullname}</p>
      <p class="meta">
        <span>${data.timeline.zoyi.location}</span>
        <span>${data.timeline.zoyi.time}</span>
      </p>
      <p class="role">${data.timeline.zoyi.role}</span>
      <p class="url">${data.timeline.zoyi.url}</p>
      <ul class="desc">
        <li class="item"><p>${data.timeline.zoyi.desc.a}</p></li>
        <li class="item"><p>${data.timeline.zoyi.desc.b}</p></li>
      </p>
    </div>
    <div class="section">
      <p class="jobname">${data.timeline.lgcns.fullname}</p>
      <p class="meta">
        <span>${data.timeline.lgcns.location}</span>
        <span>${data.timeline.lgcns.time}</span>
      </p>
      <p class="role">${data.timeline.lgcns.role}</span>
      <ul class="desc">
        <li class="item"><p>${data.timeline.lgcns.desc.a}</p></li>
      </p>
    </div>
  </div>
  <div class="timeline-entry">
    <p class="p-title">Engineering</p>
    <div class="section">
      <p class="jobname">${data.timeline.marmoym.fullname}</p>
      <p class="meta">
        <span>${data.timeline.marmoym.location}</span>
        <span>${data.timeline.marmoym.time}</span>
      </p>
      <p class="role">${data.timeline.marmoym.role}</p>
      <p class="url">${data.timeline.marmoym.url}</p>
      <ul class="desc">
        <li class="item"><p>${data.timeline.marmoym.desc.a}</p></li>
        <li class="item"><p>${data.timeline.marmoym.desc.b}</p></li>
      </p>
    </div>
    <div class="section">
      <p class="jobname">${data.timeline.gimci.fullname}</p>
      <p class="meta">
        <span>${data.timeline.gimci.location}</span>
        <span>${data.timeline.gimci.time}</span>
      </p>
      <p class="role">${data.timeline.gimci.role}</p>
      <p class="url">${data.timeline.gimci.url}</p>
      <ul class="desc">
        <li class="item"><p>${data.timeline.gimci.desc.a}</p></li>
        <li class="item"><p>${data.timeline.gimci.desc.b}</p></li>
      </p>
    </div>
    <div class="section">
      <p class="jobname">${data.timeline.swmaestro.fullname}</p>
      <p class="meta">
        <span>${data.timeline.swmaestro.location}</span>
        <span>${data.timeline.swmaestro.time}</span>
      </p>
      <p class="role">${data.timeline.swmaestro.role}</p>
      <ul class="desc">
        <li class="item"><p>${data.timeline.swmaestro.desc.a}</p></li>
      </p>
    </div>
  </div>
  <div class="timeline-entry">
    <p class="p-title">Other Activities</p>
    <div class="section">
      <p class="jobname">${data.timeline.gokathon.fullname}</p>
      <p class="meta">
        <span>${data.timeline.gokathon.location}</span>
        <span>${data.timeline.gokathon.time}</span>
      </p>
      <p class="role">${data.timeline.gokathon.role}</p>
      <ul class="desc">
        <li class="item"><p>${data.timeline.gokathon.desc.a}</p></li>
      </p>
    </div>
    <div class="section">
      <p class="jobname">${data.timeline.unesco.fullname}</p>
      <p class="meta">
        <span>${data.timeline.unesco.location}</span>
        <span>${data.timeline.unesco.time}</span>
      </p>
      <p class="role">${data.timeline.unesco.role}</p>
      <ul class="desc">
        <li class="item"><p>${data.timeline.unesco.desc.a}</p></li>
      </p>
    </div>
    <div class="section">
      <p class="jobname">${data.timeline.nepal.fullname}</p>
      <p class="meta">
        <span>${data.timeline.nepal.location}</span>
        <span>${data.timeline.nepal.time}</span>
      </p>
    </div>
    <div class="section">
      <p class="jobname">${data.timeline.military.fullname}</p>
      <p class="meta">
        <span>${data.timeline.military.location}</span>
        <span>${data.timeline.military.time}</span>
      </p>
    </div>
  </div>
</div>
`;

module.exports = Timeline;
