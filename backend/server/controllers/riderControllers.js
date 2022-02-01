

// process.env.MAPS_API_KEY

module.exports = {
  getApiKey: function (req, res) {
    console.log("Made it to sent");
     res.send(process.env.MAPS_API_KEY)
  }}
