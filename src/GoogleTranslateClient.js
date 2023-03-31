const config = require("../config");
const { Translate } = require('@google-cloud/translate').v2;


class GoogleTranslateClient {

    constructor() {

        console.log(config.translate.privateKey)

        // Instantiate a client
        this.translate_client = new Translate({
            projectId: config.translate.projectId,
            credentials: {
                client_email: config.translate.clientEmail,
                private_key: config.translate.privateKey,
            },
        });
    }

    translate_text(targetLang, inputText) {

        // Translates the text into the target language
        this.translate_client.translate(inputText, targetLang)
            .then(results => {
                const translation = results[0];
                console.log(`Text: ${inputText}`);
                console.log(`Translation: ${translation}`);
                return results
            })
            .catch(err => {
                console.error('ERROR:', err);
            });
    }
}

module.exports = GoogleTranslateClient;
