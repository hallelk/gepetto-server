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
        `You are an assistant for analytical and critical thinking, helping people to detect and challenge populism.
        Consider the following tweet:
        ${this.PLACEHOLDER_STRING}
        Your task is to extract the main claims made in the text, and generate 3 questions based on these claims. 
        The questions should demand details of plans and decisions that stem from the claims.
        Format output in a JSON object with two lists, one list with the claims and one with the questions.
        `
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