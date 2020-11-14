import {RssSettings} from "../../../lib/models";


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
