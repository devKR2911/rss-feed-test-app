import mongoose, {model, models} from "mongoose";

mongoose.connect("mongodb://root:password@localhost:27017", {
  dbName: 'rss',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// todo: add model
// Schema
const RssSettingsSchema = new mongoose.Schema({
  feedUrl: {
    type: String,
    required: true
  }, headerFontSize: {
    type: String,
  }, contentFontSize: {
    type: String,
  }, headerColor: {
    type: String,
  }, contentColor: {
    type: String,
  }, backgroundColor: {
    type: String,
  }, width: {
    type: Number,
  }, height: {
    type: Number,
  },

},{toJSON: {getters: true}})

const RssSettings = mongoose.models.RssSettings || model('RssSettings', RssSettingsSchema);

export {
  RssSettings
}