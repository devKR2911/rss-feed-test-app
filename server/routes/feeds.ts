import { Router } from 'express';
import { RssSettings } from '../db/mongoose';
import RssParser from 'rss-parser';

const router = Router();

router.get('/', async (req, res) => {
  console.log('within handler');
  const feeds = await RssSettings.find();
  res.json(feeds);
});
router.post('/', async (req, res) => {
  await RssSettings.create(req.body);
  res.json({
    message: 'Settings saved successfully',
  });
});
router.get('/:id', async (req, res) => {
  const settings = await RssSettings.findOne({
    _id: req?.params?.id,
  });
  if (!settings?.feedUrl) {
    return res.status(404).json({
      message: 'RSS Feed url not configured',
    });
  }

  const parser = new RssParser();
  const feed = await parser.parseURL(settings?.feedUrl);

  res.json({ settings, feed });
});
router.put('/:id', async (req, res) => {
  const { __v, _id, ...rest } = req.body;
  await RssSettings.updateOne(
    { _id: req?.params?.id },
    {
      $set: rest,
    },
  );
  res.json({
    message: 'Settings updated successfully',
  });
});
router.delete('/:id', async (req, res) => {
  await RssSettings.deleteOne({ _id: req?.params?.id });
  res.json({
    message: 'Settings deleted successfully',
  });
});

export default router;
