import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello' });
});

router.get('/db', (req, res) => {
  req.db.messages.find({}).toArray((err, docs) => {
    if (err) return err;
    return docs;
  });
  res.redirect('/api');
});

export default router;
