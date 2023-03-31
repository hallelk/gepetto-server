const gptClient = require('./GPTClient');
const translateClient = require('./GoogleTranslateClient');

async function getClaims(text, targetLang = 'he') {

    // create API clients
    let gpt = new gptClient();
    let translate = new translateClient()

    // query GPT
    let gpt_response = gpt.query_gpt(text);

    // generate response
    return {
        'en': {
            gpt_response
        },
        [targetLang]: {
            'claims': gpt_response['claims'].map(claim => translate.translate_text(targetLang, claim)),
            'questions': gpt_response['questions'].map(question => translate.translate_text(targetLang, question))
        }
    }
}


module.exports = {
    getClaims
}
