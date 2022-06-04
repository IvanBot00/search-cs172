function search(object) {
    document.getElementById('result').innerHTML = ''

    const value = object.value
    object.value = ''

    arr = value.split(' ');

    require('child_process').exec(command, function (err, data, stderr) {
        data = JSON.parse(data);

        console.log(data);

        hits = data['hits']['hits'];

        hits.sort((a, b) => (a._score < b._score) ? 1 : -1)

        for (var i = 0; i < hits.length; i++) {
            var text = hits[i]['_source']['html']

            text = makeBold(arr, text);

            displayData(hits[i]['_score'], text)
        }
    });
}

function displayData(score, text) {
    const datadiv = document.createElement('div');
    datadiv.className = "textcontent"

    datadiv.innerHTML = 'score =' + score + '<br>' + 'text: \n' + text

    document.getElementById('resultdiv').appendChild(datadiv);
}