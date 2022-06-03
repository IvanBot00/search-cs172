const { Client } = require('@elastic/elasticsearch')
const express = require('express');
const app = express();
const port = 4000;

const client = new Client({
    node: 'http://localhost:9200'
  });

app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});