const { format } = require('../utils/stringUtils');
const toStyle = require('../utils/sassc').toStyle;

const className = toStyle({
  name: 'wrap',
  style: `
    display: flex;
    min-height: 100%;
    justify-content: center;
    padding: 15px;
    min-width: 1000px;
    
    > div {
      padding: 14px 0px;
    }
    
    .summary-wrapper {
      background-color: #fcfcfc;
      flex-shrink: 0;
      width: 260px;
    }

    .body-wrapper {
      flex-shrink: 0;
      margin-left: 16px;
      margin-bottom: 16px;
      width: 580px;

      .head-title {
        font-size: 18px;
        font-family: Georgia, 'Times New Roman', Times, serif;
        line-height: 2;
        letter-spacing: 1px;
        text-align: center;
      }

      .head-title-divider {
        font-weight: 200;
        letter-spacing: 2px;
        line-height: 35px;
        text-align: center;
      }
    }

    @media only screen and (max-width: 600px)  {
      min-width: 320px;
      padding: 0;
      display: block;
    
      > div {
        margin-bottom: 21px;
      }
    
      .summary-wrapper {
        display: flex;
        justify-content: center;
        width: 100%;
      }
    
      .body-wrapper {
        flex-shrink: 0;
        margin-left: 0px;
        padding: 0 14px;
        width: 100%;
      }
    }
  `,
});

const Wrapper = ({ data, components }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${data.profile.name}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" type="text/css" media="screen" href="assets/css/main.css" />
  <script src="assets/js/main.js"></script>
</head>
<body>
  <div class=${className}>
    <div class="summary-wrapper">
      ${components.summary}
    </div>
    <div class="body-wrapper">
      ${components.body}
    </div>
  </div>
</body>
</html>
`;

module.exports = Wrapper;