import os
from openai import AzureOpenAI


AZURE_KEY = "6f622bab64bf458382941efd84ebc13d"

def get_recipe(weight, ingredients):
    client = AzureOpenAI(
        api_key=AZURE_KEY,
        api_version="2024-02-01",
        azure_endpoint="https://wholeapp.openai.azure.com/"
    )



    # This will correspond to the custom name you chose for your deployment when you deployed a model.
    # Use a gpt-35-turbo-instruct deployment.
    deployment_name = "gpt-35-turbo-instruct"

    # Send a completion call to generate an answer
    prompt = ("Make an eco-friendly recipe using the ingredients from the list: " + ingredients + 
    "with the most perishable ingredients being used first with the intent of " +
    weight + "and keept it short and simple with nothing unnecesary")
    response = client.completions.create(
        model=deployment_name,
        prompt=prompt,
        temperature=1,
        max_tokens=350,
        top_p=0.6,
        frequency_penalty=0,
        presence_penalty=0,
        best_of=1,
        stop=None
    )

    return (response.choices[0].markdown)
