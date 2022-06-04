const indexing = require("./indexing")
const { Client } = require('@elastic/elasticsearch')
const express = require('express');
const app = express();
const port = 4000;

const client = new Client({
  node: 'http://localhost:9200'
});


// Post request will receive data from search form
app.post('/search', (req, res) => {
  // let searchString = req.body.text;

  // Call elasticsearch with the search string here

  /*
  const results = await client.search({
    index: 'page-body',
    query: {
      match: { 
        quote: searchString
      }
    }
  });
  */

  let results = 
  [
    {
      title: "UCR Article",
      text: "This is an example article at UCR"
    },
    {
      title: "UCR Graduation",
      text: "How to graduate"
    }
  ]

  res.json(results);
})

function indexPages() {
  // Do indexing stuff here
  
  // foreach file
    // load file
    // add file to index??
    // close file

  // refresh index
  
}

app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});

