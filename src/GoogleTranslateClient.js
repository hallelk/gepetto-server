const config = require("../config");
const { Exception, ErrorType } = require("./exception");
const { Translate } = require('@google-cloud/translate').v2;


class GoogleTranslateClient {

    constructor() {

        // console.log(`PrivateKey: ${config.translate.privateKey}`)

        // Instantiate a client
        this.translate_client = new Translate({
            projectId: config.translate.projectId,
            credentials: {
                client_email: config.translate.clientEmail,
                private_key: config.translate.privateKey,
            },
        });
    }

    async translate_text(targetLang, inputText) {

        if (targetLang.length > 2) throw new Exception(ErrorType.BadRequest, "bad language", true);
        // Translates the text into the target language
        const res = await this.translate_client.translate(inputText, targetLang).catch((e) => {console.error(e); throw new Exception(ErrorType.InternalError, "error in translation", true)});
        return res[0]

    }
}

module.exports = GoogleTranslateClient;
