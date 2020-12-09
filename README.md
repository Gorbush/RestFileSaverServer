# RestFileSaverServer

Starts a NodeJS Express server which listens on the port 3333 for incoming requests and saves them into the file in the subfolder **responses/**.

Example in PostMan javascript to save the response:

```
  console.log("pm.sendRequest({ url: 'http://localhost:3333/save/test.json', method: 'POST', header: 'Content-Type: application/json', body: responseBody});");
```  

Example in IntelliJ HTP file:

```
POST http://localhost:3333/save/test.json
Content-Type: application/json

{
    "sampleText" : "Value 01",
    "sampleNumber" : 12.3
}
```

Example in CURL:

```
curl -d "{'sampleText' : 'Value 01', 'sampleNumber' : 12.3 }" -X POST http://localhost:3333/save/test.json
```

Response is saved into the **response/test.json**:

```
{
"result": "Success"
}
```
