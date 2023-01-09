import requests
# Set the API key for accessing OpenAI's API
url = "https://api.openai.com/v1/completions"

headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer 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",
}

data = {
    "model": "text-davinci-003",
    "prompt": "Tell me about economics",
    "temperature": 0,
    "max_tokens": 1000,
}
response = requests.post(url, headers=headers, json=data)

if response.status_code == 200:
    # Request was successful
    response_data = response.json()
    print(response_data)
    generated_text = response_data["choices"][0]["text"]
    print(generated_text)
else:
    # Request failed
    print("An error occurred:", response.text)
