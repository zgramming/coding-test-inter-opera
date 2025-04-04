import os
import google.generativeai as genai

from google.generativeai import GenerativeModel

HISTORY = []

class GenAIService:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY environment variable is not set.")

    def configure(self):
        genai.configure(api_key=self.api_key)

    def create_model(self, model_name="gemini-1.5-pro", scope_data= ""):
        generation_config = {
                "temperature": 1,
                "top_p": 0.95,
                "top_k": 40,
                "max_output_tokens": 8192,
                "response_mime_type": "text/plain",
            }
        
        SYSTEM_INSTRUCTION = f"""
You are a very skilled person in the field of sales and business analysis. Your job is just to answer questions related to the json data that I provide. 

The data is : {scope_data}

Any questions that are outside the context of the data provided can be answered with "the question is beyond my scope"

Analyze the data thoroughly and provide concise, accurate answers. When appropriate, include relevant statistics or insights from the data.

Base your responses solely on the provided JSON data. Do not make assumptions beyond what's in the data.
"""
        

        model = genai.GenerativeModel(
            model_name=model_name,
            generation_config=generation_config,
            system_instruction=SYSTEM_INSTRUCTION,
        )
        return model
    
    def start_chat(self, input_text="", scope_data=""):
        model = self.create_model(scope_data=scope_data)
        chat_session = model.start_chat(history=HISTORY)
        response = chat_session.send_message(input_text)

        # Append the user message to the history
        HISTORY.append({"role": "user", "parts": [input_text]})
        # Append the AI response to the history
        HISTORY.append({"role": "model", "parts": [response.text]})

        return response.text