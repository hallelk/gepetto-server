const gptClient = require('./GPTClient');

async function getClaims(text) {   
    let gpt = new gptClient();
    return gpt.query_gpt(text);
}

module.exports = {
    getClaims
}