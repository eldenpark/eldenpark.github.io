const Wrapper = (data, components) => `
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
  <div id="wrap">
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