const { Client } = require('@elastic/elasticsearch')
const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const port = 4000;

app.use(cors());

const client = new Client({
  node: 'http://localhost:9200'
});


// Post request will receive data from search form and return results
app.get('/search/:searchString', async (req, res) => {
  let searchString = ""

  if (req.params) {
    searchString = req.params.searchString;
    // console.log(searchString);
  }

  // const results = await searchPages(searchString).hits;
  const results = await client.search({
    index: 'pages',
    query: {
      match: {
        content: searchString
      }
    }
  });
  // console.log(results.hits.hits);

  res.json(results.hits.hits);
});

// app.get('/search/:')

async function searchPages(searchString) {
  const result = await client.search({
    index: 'pages',
    query: {
      match: { 
        content: searchString
      }
    }
  });
}

async function indexPages() {
  let exists = await client.indices.exists({index: 'pages'})

  if (exists)
    await deletePages();

  await client.indices.create({
    index: 'pages',
  });

  fs.readdirSync("../data").forEach( async (file) =>  {
    let fileContent = fs.readFileSync("../data/" + file, {encoding: "utf8"});
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

async function deletePages() {
  await client.indices.delete({
    index: 'pages',
  });
}

indexPages();

app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});

