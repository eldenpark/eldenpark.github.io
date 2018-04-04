const { format } = require('../utils/stringUtils');
const toStyle = require('../utils/sassc').toStyle;

const className = toStyle({
  name: 'summary',
  style: `
    display: flex;
    flex-direction: column;
    height: 95%;
    position: fixed;
    left: calc(50% - 425px); // 360 + 130 + padding
    padding: 0px 14px;
    top: 55px;
    width: 260px;

    .profile_photo {
      text-align: center;

      > img {
        border-radius: 3px;
        width: 80%;
      }
    }

    .desc {
      margin-top: 8px;

      .name {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 14px;
        text-align: center;
      }

      .meta {
        font-weight: 500;
      }

      .contact {
        margin-top: 8px;

        > div {
        }

        span {
          color: #555;
          display: inline-block;
          width: 66px;
          font-weight: 600;
        }
      }
    }

    .navigation {
      margin-top: 24px;

      .active {
        > span {
          font-weight: bold;
        }
      }

      > li {
        display: inline-block;
        &:before {
          content: '|';
          margin: 0 3px;
        }
      }
    }

    .updated-at {
      font-size: 11px;
      margin-top: 10px;
    }

    @media only screen and (max-width: 600px) {
      position: static;
      display: flex;
      flex-direction: column;
      height: 95%;
      padding: 0;
      width: 260px;
    }

    @media only screen and (min-width: 600px) and (max-width: 1100px) {
      display: flex;
      flex-direction: column;
      height: 95%;
      position: fixed;
      left: 55px; // 360 + 130 + padding
      padding: 0px 14px;
      top: 35px;
      width: 260px;
    }
  `,
});

const Summary = (data, config) => `
  <div class=${className}>
    <div class="profile_photo">
      <img src="assets/img/pic2.jpg" alt="profile_photo">
    </div>
    <div class="desc">
      <p class="name">${data.profile.name}</p>
      <div class="meta">
        <p>${data.$softwareEngineer}</p>
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
        <div>
          <span>LinkedIn</span>
          <a href="${data.profile.linkedInUrl}">${data.profile.name}</a>
        </div>
      </div>
    </div>
    <div class="updated-at">Last modified Mar 2018</div>
    <ul class="navigation">
      <li class="${config.navigation === 'timeline' ? 'active' : ''}">
        <span><a href="/">Timeline</a></span>
      </li>
      <li class="${config.navigation === 'music' ? 'active' : ''}">
        <span>Music</span>
      </li>
    </ul>
  </div>
`;

module.exports = Summary;
