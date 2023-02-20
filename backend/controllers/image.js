const handleApiCall = (req, res) => {
    const raw = JSON.stringify({
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": req.body.imageUrl
                    }
                }
            }
        ]
      });
      
      const requestOptions = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Key ' + 'b9992b295141427a94df83963d2a7b06' //API Key
          },
          body: raw
      };
    
      fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, requestOptions)
          .then(response => response.json())
          .then(data => {
            res.json(data);
          })
          .catch(err => res.status(400).json('unable to work with API'))
} 

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries)
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
};