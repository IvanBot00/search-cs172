const { Client } = require('@elastic/elasticsearch')
const express = require('express');
const app = express();
const fs = require('fs');
const port = 4000;

const client = new Client({
  node: 'http://localhost:9200'
});


// Post request will receive data from search form and return results
app.get('/search', async (req, res) => {
  // let searchString = req.body.text;
  let searchString = "test" // temporary testing search string

  const results = await searchPages(searchString);

  res.json(results);
})

async function searchPages(searchString) {
  const result = await client.search({
    index: 'pages',
    query: {
      match: { 
        content: searchString
      }
    }
  });
  console.log(result.hits);
}

async function indexPages() {
  fs.readdirSync("../data").forEach( async (file) =>  {
    let fileContent = fs.readFileSync("../data/" + file, {encoding: "utf8"});
    // console.log(file)
    // console.log(fileContent)
    await client.index({
      index: 'pages',
      document: {
        title: file,
        content: fileContent,
      }
    });
  });

  client.indices.refresh({ index: 'pages' });
  
}

// client.indices.delete("pages")
indexPages();

app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});

