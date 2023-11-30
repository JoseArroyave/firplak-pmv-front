const express = require('express');
const path = require('path');
const app = express();
app.use(express.static('/dist/firplak-front/browser'));
app.get('/*', function (req, res) {
  res.sendFile(path.join('/dist/firplak-front/browser/index.html'));
});
app.listen(process.env.PORT || 8080); 