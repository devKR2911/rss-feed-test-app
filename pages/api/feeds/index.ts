
import {RssSettings} from "../../../lib/models";

export default async function (req, res) {

  switch (req.method) {
    // Create new feed settings
    case 'POST':
        await RssSettings.create(req.body)
      res.json({
        message: 'Settings saved successfully'
      })
      break;
    // Get all feed settings
    case 'GET':
      const feeds = await RssSettings.find();
      res.json(feeds);
      break;
  }
}