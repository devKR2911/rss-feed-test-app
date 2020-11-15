import { RssSettings } from '../db/mongoose';
import RssParser from 'rss-parser';

const FeedList = async () => {
  console.log('within handler');
  const feeds = await RssSettings.find();
  return feeds;
};

const FeedInsert = async (args) => {
  return RssSettings.create(args.feed);
};
const FeedDataRead = async (args) => {
  const settings = await RssSettings.findOne({
    _id: args.id,
  });
  if (!settings?.feedUrl) {
    throw new Error('Not found');
  }

  const parser = new RssParser();
  const feed = await parser.parseURL(settings?.feedUrl);

  return { settings, feed };
};
const FeedUpdate = async (args) => {
  const { __v, _id, ...rest } = args.feed;
  await RssSettings.updateOne(
    { _id: args?.id },
    {
      $set: rest,
    }
  );
  return args.feed;
};

const FeedDelete = async (args) => {
  await RssSettings.deleteOne({ _id: args?.id });
  return true;
};

export default {
  FeedInsert,
  FeedUpdate,
  FeedDelete,
  FeedList,
  FeedDataRead,
};
