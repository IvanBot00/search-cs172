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
  let searchString = "Spanish" // temporary testing search string

  const results = await searchPages(searchString);

  // let results = 
  // [
  //   {
  //     title: "UCR Article",
  //     text: "This is an example article at UCR"
  //   },
  //   {
  //     title: "UCR Graduation",
  //     text: "How to graduate"
  //   }
  // ]

  res.json(results);
})

async function searchPages(searchString) {
  const result = await client.search({
    index: 'pages',
    query: {
      match: { 
        quote: searchString
      }
    }
  });
  console.log(result.hits.hits);
}

async function indexPages() {
  fs.readdirSync("../data").forEach(file => {
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

indexPages();

async function run () {
  // Let's start by indexing some data
  await client.index({
    index: 'game-of-thrones',
    document: {
      character: 'Ned Stark',
      quote: 'Winter is coming.'
    }
  })

  await client.index({
    index: 'game-of-thrones',
    document: {
      character: 'Daenerys Targaryen',
      quote: 'I am the blood of the dragon.'
    }
  })

  await client.index({
    index: 'game-of-thrones',
    document: {
      character: 'Tyrion Lannister',
      quote: 'A mind needs books like a sword needs a whetstone.'
    }
  })

  // here we are forcing an index refresh, otherwise we will not
  // get any result in the consequent search
  await client.indices.refresh({ index: 'game-of-thrones' })

  // Let's search!
  const result= await client.search({
    index: 'game-of-thrones',
    query: {
      match: { quote: 'winter' }
    }
  })

  console.log(result.hits.hits)
}

run().catch(console.log)

app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});

