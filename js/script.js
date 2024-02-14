import {apiKey} from './config.js'
const message = document.querySelector('#message');
const send = document.querySelector('#send');
const apiUrl='https://api.openai.com/v1/chat/completions';
const chatBox=document.querySelector('.chat');
send.addEventListener('click',()=>{
    prompt=message.value;
    message.value='';
    if(prompt!==""){
        send.style.display='none';
        let placeholder = message.placeholder;
        message.placeholder = 'Generating Text';
        let sendHtml=`<div class="send">
        <span>${prompt}</span>
    </div>`;
chatBox.insertAdjacentHTML('beforeend',sendHtml);
chatBox.scrollTop = chatBox.scrollHeight;
let loadHtml=`<div class="response">
<div class='loader'></div>
</div>`;
chatBox.insertAdjacentHTML('beforeend',loadHtml);
chatBox.scrollTop = chatBox.scrollHeight;
        fetch(apiUrl,{
            method:'POST',
            headers:{
                "Content-Type":" application/json",
                "Authorization" : `Bearer ${apiKey}`
            },
            body:JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [
                    {
                      "role": "user",
                      "content": prompt
                    }
                  ]
            })
        }).then(response=>response.json()).then(data=>{
            const res=(data.choices[0].message.content);
            const resHtml=`<div class="response">
            <span>${res}</span>
        </div>`;
        chatBox.removeChild(chatBox.lastChild);
        chatBox.scrollTop = chatBox.scrollHeight;
        chatBox.insertAdjacentHTML('beforeend',resHtml);
        chatBox.scrollTop = chatBox.scrollHeight;
        send.style.display='flex';
        message.placeholder = placeholder;
        }).catch(error=>console.log(error.message))
    }
})
