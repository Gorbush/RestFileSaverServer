const express = require('express'),
  app = express(),
  fs = require('fs'),
  shell = require('shelljs'),

   // Modify the folder path in which responses need to be stored
  folderPath = './responses/',
  defaultFileExtension = 'json', // Change the default file extension
  bodyParser = require('body-parser'),
  path = require('path');

// Create the folder path in case it doesn't exist
shell.mkdir('-p', folderPath);

 // Change the limits according to your response size
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (req, res) => res.send('Hello, I write data to file. Send them requests!'));

app.post('/write', (req, res) => {
  let extension = req.body.fileExtension || defaultFileExtension,
    filePath = `${path.join(folderPath, req.body.requestName)}.${extension}`;

  fs.writeFile(filePath, req.body.responseData, (err) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({result:'Error'}, null,2));
    }
    else {
      res.send(JSON.stringify({result: 'Success'},null,2));
    }
  });
});

app.post('/save/*', (req, res) => {
  let fileName = req.path.substr(6);
  let filePath = path.join(folderPath, fileName);

  let content = req.body;
  if (typeof content == "object") {
    content = JSON.stringify(req.body, null, 2);
  }
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({result:'Error'}, null,2));
    }
    else {
      res.send(JSON.stringify({result: 'Success'},null,2));
    }
  });
});

app.listen(3333, '127.0.0.1', () => {
  console.log('RestFileSaverServer App is listening now! Send them requests my way!');
  console.log(`Data is being stored at location: ${path.join(process.cwd(), folderPath)}`);
  console.log("Example one-liner to use in PostMan to save the content:");
  console.log("pm.sendRequest({ url: 'http://localhost:3333/save/test.json', method: 'POST', header: 'Content-Type: application/json', body: responseBody});");
});
