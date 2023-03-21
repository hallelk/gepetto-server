const express = require('express');
const BL = require('./BL');
// const SecurityMW = require('./Middleware'); // TODO : add
// const { errorHandler } = require('./Middleware'); // TODO : add

const router = express.Router();

// Security
// router.use('/', SecurityMW.VerifyToken);

router.post('/claims', async (req, res, next) => { 
    await BL.getClaims(req.body.text).then((v) => res.json(v), next); 
});

// router.use(errorHandler);
module.exports = router;