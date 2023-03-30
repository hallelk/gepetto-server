const config = require('../config.js');
const axios = require('axios');

class GPTClient {

    OPENAI_URL = `https://api.openai.com/v1/completions`;
    PLACEHOLDER_STRING = `@@@XXX@@@XXX`;
    constructor() {
  
      // openai API
      this.api_model = config.gpt.model;
      
      this.api_headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.gpt.token}`,
      };
  
      // gpt query parameters
      this.temperature = config.gpt.temperature;
      this.max_tokens = config.gpt.max_tokens;
  
      // prompt
      this.prompt_template = 
        `You are an assistant for critical thinking.
        Consider the following tweet: 
        ${this.PLACEHOLDER_STRING}
        Your tasks are to extract the claims made in the text, 
        and generate questions which challenge these claims.
        Both claims and questions should be in Hebrew.
        Semantically, the questions should inquire about facts to base the claims, 
        people and institutions involved in situations described in the post, 
        demand details for vague claims, challenge assumptions.
        Format output as a JSON Array of objects, where each object represents a claim and its associated questions.`
    }
  
    query_gpt(input_text) {
  
      // build prompt
      const prompt = this.prompt_template.replace(this.PLACEHOLDER_STRING, input_text);
      
      // console.log("Full prompt:" + full_prompt);
      // console.log(this.api_headers);
  
      // build request
      const request = {
        method: "POST",
        url: this.OPENAI_URL,
        headers: this.api_headers,
        data: {
          model: this.api_model,
          prompt: prompt,
          temperature: this.temperature,
          max_tokens: this.max_tokens,
          stream: false
        }
      };
  
      return axios(request)
        .then((response) => response.data )
        .catch((error) => console.error(error))
        .then(parsed_data => {
          console.log(parsed_data);
          if (parsed_data)
            return JSON.parse(parsed_data['choices'][0]['text']);
        })
    }
  }
  
  module.exports = GPTClient;