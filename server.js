let express = require('express');
let app = express();

app.use(express.static(__dirname + '/dist/firplak_front/browser'));

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/dist/firplak_front/browser/index.html');
});

app.listen(process.env.PORT || 8080); 