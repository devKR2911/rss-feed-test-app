import mongoose, {model} from "mongoose";

mongoose.connect("mongodb://root:password@localhost:27017", {
  dbName:'rss',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});



// Schema
const RssSettingsSchema = new mongoose.Schema({
  fontSize: {
    type: String,
    required: true
  },  headColor: {
    type: String,
    required: true
  },  contentColor: {
    type: String,
    required: true
  }, backgroundColor: {
    type: String,
    required: true
  },width: {
    type: Number,
    required: true
  },height: {
    type: Number,
    required: true
  },

})

const RssSettings = model('RssSettings',RssSettingsSchema);


export default async function (req, res) {

  switch (req.method) {
    case 'POST':
      const oldRecord = await RssSettings.findOne();
      if (oldRecord) {
        await RssSettings.updateOne({_id: oldRecord._id}, {
          $set: req.body
        })
      } else {
        await RssSettings.create(req.body)
      }
      break;
    case 'GET':
      res.json(await RssSettings.findOne())
      break;
  }


}