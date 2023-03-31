const express = require('express');
const BL = require('./BL');
const { Exception, ErrorType } = require('./exception');

const router = express.Router();


router.get('/', (_, res) => { res.send('hello and welcome to the api'); });
router.post('/claims', async (req, res, next) => { 
    await BL.getClaims(req.body.text, req.body.lang)
        .then((v) => res.json(v))
        .catch((e) => {
            console.error(e);
            if (e instanceof Exception) {
                console.error("raised Exception");
                res.status(e.errorType);
                res.send(
                    {
                        message: e.message,
                        isFatal: e.isFatal,
                    }
                );
            } else {
                console.error("unexpected exception");
                res.status(500);
                res.send(
                    {
                        message: "unexpected error",
                        isFatal: true,
                    }
                );
            }
            
        });
});

module.exports = router;
