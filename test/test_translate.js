const translateClient = require('../src/GoogleTranslateClient');

let translate_client = new translateClient();
let trans_result = translate_client.translate_text('he', 'hello');
console.log(trans_result);
