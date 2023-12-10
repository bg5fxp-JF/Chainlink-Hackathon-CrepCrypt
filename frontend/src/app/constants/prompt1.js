const openAIRequest = await Functions.makeHttpRequest({
    url: 'https://api.openai.com/v1/chat/completions',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${secrets.apiKey}`
    },
    data: {
        'model': 'gpt-4-vision-preview',
        'messages': [{
            'role': 'user',
            'content': [{
                'type': 'text',
                'text': 'I am sending you a picture of a ' + args[0] + '. Reply with ONLY `1` if the picture is a real ' + args[0] + ' reply with a `2` if this is not a ' + args[0]
            },
            {
                'type': 'image_url',
                'image_url': {
                    'url': args[1]
                }
            }]
        }],
        'max_tokens': 300
    }
})

const response = openAIRequest.data.choices[0].message.content;

const numRes = Number(response)

return Functions.encodeUint256(numRes)