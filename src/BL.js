const gptClient = require('./GPTClient');

async function getClaims(text) {   
    console.log("111111111111111111111111111111111"); 
    console.log(text); 
    console.log("111111111111111111111111111111111"); 
    let gpt = new gptClient();
    return gpt.query_gpt(text);
}

module.exports = {
    getClaims
}