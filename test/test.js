const request = require('supertest');
const app = require('../src/app');

const sampleText = `הנברא הוא חומר. הבורא הוא לא חומר`;

request(app)
    .post('/api/claims')
    .send({text: sampleText, lang: 'he'})
    .expect(200)
    .end(function(err, res) {
        if (err) {
            console.log(err);
            throw err; }
        else {
            doTests(res.body);
        }
    });

    async function doTests(output)  {
        console.log(`Output: ${JSON.stringify(output)}`)
    }
