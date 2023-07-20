import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  const obj = {
    a: 'Notes',
    number: 34
  };
  res.json(obj);
});

export default router;