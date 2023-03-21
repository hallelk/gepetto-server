const config = require('../config.js');
const axios = require('axios');

class GPTClient {

    OPENAI_URL = `https://api.openai.com/v1/completions`;

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
      this.prompt_intro =
        `You are an assistant for critical thinking.
        Consider the following tweet: `;
      this.prompt_instructions = `
        Your tasks are to extract the claims made in the text, 
        and generate questions which challenge these claims. 
        Semantically, the questions should inquire about facts to base the claims, 
        people and institutions involved in situations described in the post, 
        demand details for vague claims, challenge assumptions.
      `;
      this.prompt_output =
        `Questions' text should be in Hebrew.
        List the claims and the questions associated with each claim. 
        Format output in a JSON list, where each object has the claim's text and the questions associated with it.`
    }
  
    query_gpt(input_text) {
  
      // build prompt
      const full_prompt = `${this.prompt_intro}${input_text}${this.prompt_instructions}${this.prompt_output}`;
      
      // console.log("Full prompt:" + full_prompt);
      // console.log(this.api_headers);
  
      // build request
      const request = {
        method: "POST",
        url: this.OPENAI_URL,
        headers: this.api_headers,
        data: {
          model: this.api_model,
          prompt: full_prompt,
          temperature: this.temperature,
          max_tokens: this.max_tokens,
          stream: false
        }
      };
  
      return axios(request)
        .then((response) => response.data )
        .catch((error) => console.error(error))
        .then(parsed_data => {
          if (parsed_data)
            return parsed_data['choices'][0]['text'];
        })
    }
  }
  
  module.exports = GPTClient;