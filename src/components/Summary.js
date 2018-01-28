const Summary = (data, config) => `
  <div class="summary">
    <div class="profile_photo">
      <img src="assets/img/pic2.jpg" alt="profile_photo">
    </div>
    <div class="desc">
      <p class="p-bold p-big name">${data.profile.name}</p>
      <p class="p-bold">${data.$softwareEngineer}</p>
      <p>${data.profile.location}</p>
      <div class="contact">
        <p><a href="mailto:${data.profile.email}">${data.profile.email}</a></p>
        <p><a href="${data.profile.githubUrl}">${data.profile.githubName}</a> (github) / <a href="${data.profile.mediumUrl}">${data.profile.fullAccountName}</a> (medium)</p>
      </div>
    </div>
    <ul class="navigation">
      <li class="${config.navigation === 'timeline' ? 'active' : ''}"><span>Timeline</span></li>
      <li class="${config.navigation === 'music' ? 'active' : ''}"><span>(under construction)</span></li>
    </ul>
  </div>
`;

module.exports = Summary;
