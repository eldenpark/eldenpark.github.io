const Summary = (data, config) => `
  <div class="summary">
    <div class="profile_photo">
      <img src="assets/img/pic2.jpg" alt="profile_photo">
    </div>
    <div class="desc">
      <p class="name">${data.profile.name}</p>
      <div class="meta">
        <p class="p-bold">${data.$softwareEngineer}</p>
        <p>${data.profile.location}</p>
      </div>
      <div class="contact">
        <div>
          <span>Email</span>
          <a href="mailto:${data.profile.email}">${data.profile.email}</a>
        </div>
        <div>
          <span>Github</span>
          <a href="${data.profile.githubUrl}">${data.profile.githubName}</a>
        </div>
        <div>
          <span>Medium</span>
          <a href="${data.profile.mediumUrl}">${data.profile.fullAccountName}</a>
        </div>
      </div>
    </div>
    <div class="updated-at">Last modified Feb 2018</div>
    <ul class="navigation">
      <li class="${config.navigation === 'timeline' ? 'active' : ''}"><span>Timeline</span></li>
      <li class="${config.navigation === 'music' ? 'active' : ''}"><span>Music</span></li>
    </ul>
  </div>
`;

module.exports = Summary;
