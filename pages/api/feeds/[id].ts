import RssParser from 'rss-parser';
import {RssSettings} from "../../../lib/models";

export default async function (req, res) {

  switch (req.method) {
    // Update feed settings
    case 'PUT':
      await RssSettings.updateOne({_id: req?.query?.id}, {
        $set: req.body
      })
      res.json({
        message: 'Settings updated successfully'
      })
      break;
    // Delete feed settings
    case 'DELETE':
      await RssSettings.deleteOne({_id: req?.query?.id})
      res.json({
        message: 'Settings deleted successfully'
      })
      break;

    // Get feed settings by id
    case 'GET':
      const settings = await RssSettings.findOne({
        _id: req?.query?.id
      });
      if (!settings?.feedUrl) {
        // todo:  choose right error code
        return res.status(404).json({
          message: 'RSS Feed url not configured'
        })
      }

      const parser = new RssParser();
      // todo: replace hardcoded value
      const feed = await parser.parseURL('https://www.reddit.com/.rss');

      res.json({settings, feed});
      break;
  }
}