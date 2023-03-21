const app = require("./src/app");
const config = require(`./config.js`);

const env = process.env.NODE_ENV || config.env;
const port = process.env.PORT || config.PORT;

console.log(`ENVIRONMENT: ${env}`);

app.listen(port , () => {
    console.log(`Server listening on port ${port}`);
});
