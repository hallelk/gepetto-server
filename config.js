require('dotenv').config();

module.exports = {
    'env': 'production',
    'PORT': 3080,
    'gpt' : {
        'token' : process.env.GPT_TOKEN,
        'model' : 'text-davinci-003',
        'temperature' : 0.05,
        'max_tokens' : 3000
    }
};