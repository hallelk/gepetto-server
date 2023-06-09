const gptClient = require('./GPTClient');
const translateClient = require('./GoogleTranslateClient');

async function getClaims(text, targetLang = 'he') {

    // create API clients
    let gpt = new gptClient();
    let translate = new translateClient();

    // query GPT
    let gpt_response = await gpt.query_gpt(text);

    // console.log(`GPT Response: ${JSON.stringify(gpt_response)}`)

    // generate response
    let getResponse = async () => ({
        'claims': await Promise.all(
            gpt_response['claims'].map(claim => translate.translate_text(targetLang, claim))
        ),
        'questions': await Promise.all(
            gpt_response['questions'].map(question => translate.translate_text(targetLang, question))
        )});
    let a = await getResponse();
    console.log(a);
    return a;
}

module.exports = {
    getClaims
}
