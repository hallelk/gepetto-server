require('dotenv').config();

module.exports = {
    'env': 'production',
    'secret': process.env.SECRET,
    'tokenTTL': 60 * 60 * 24, // 24Hrs
    'PORT': 3080,
    'gpt' : {
        'token' : process.env.GPT_TOKEN,
        'model' : 'text-davinci-003',
        'temperature' : 0.05,
        'max_tokens' : 3000
    }
};