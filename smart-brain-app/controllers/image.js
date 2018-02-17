const Clarifai = require('clarifai');
// initialize with your api key. This will also work in your browser via http://browserify.org/
const app = new Clarifai.App({
 apiKey: 'b049a5a360694a899ec4df89c9b3d9ac'
});

const handleApiCall = (req, res) => {
  app.models.
    predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}



const handleImage = (req, res, db ) => {
  const {id} = req.body;

  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}


module.exports = {
  handleImage, handleApiCall
}
