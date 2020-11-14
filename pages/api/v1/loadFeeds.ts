import {RssSettings} from "../../../lib/models";
import RssParser from 'rss-parser';

export default async function (req, res) {
  const settings = await RssSettings.findOne();
  if (!settings?.feedUrl) {
    // todo:  choose right error code
    return res.status(404).json({
      message: 'RSS Feed url not configured'
    })
  }

  const parser = new RssParser();
  // todo: replace hardcoded value
  const feed = await parser.parseURL('https://www.reddit.com/.rss');

  res.json(feed);

}