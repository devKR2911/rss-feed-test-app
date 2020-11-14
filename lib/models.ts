import mongoose, {model, models} from "mongoose";

mongoose.connect("mongodb://root:password@localhost:27017", {
  dbName: 'rss',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});


// Schema
const RssSettingsSchema = new mongoose.Schema({
  fontSize: {
    type: String,
    required: true
  }, headColor: {
    type: String,
    required: true
  }, contentColor: {
    type: String,
    required: true
  }, backgroundColor: {
    type: String,
    required: true
  }, width: {
    type: Number,
    required: true
  }, height: {
    type: Number,
    required: true
  },

})

const  RssSettings = mongoose.models.RssSettings ||  model('RssSettings', RssSettingsSchema);

export {
  RssSettings
}