const express = require('express');
const BL = require('./BL');

const router = express.Router();


router.get('/', (_, res) => { res.send('hello and welcome to the api'); });
router.post('/claims', async (req, res, next) => { 
    await BL.getClaims(req.body.text, req.body.lang).then((v) => res.json(v), next);
});

module.exports = router;
