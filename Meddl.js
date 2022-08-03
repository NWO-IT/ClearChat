async function DeleteAll() {
    const channelId = document.URL.substr(document.URL.indexOf("@me/") + 4);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id_cache");
    const sleep = ms => new Promise(r => setTimeout(r, ms));

    function request(method, url) {
        let req = new XMLHttpRequest();
        req.open(method, url, false);
        req.setRequestHeader("authorization", token);
        req.send();
        return req;
    }

    let messages = JSON.parse(request("GET", `https://discord.com/api/v9/channels/${channelId}/messages?limit=50`).responseText);
    while(messages.length !== 0){
        for(const msg of messages){
            if(msg.author.id !== userId){
                continue;
            }

            while(request("DELETE", `https://discord.com/api/v9/channels/${channelId}/messages/${msg.id}`).status === 429){
                await sleep(5000);
            }
            await sleep(1000);
        }

        messages = JSON.parse(request("GET", `https://discord.com/api/v9/channels/${channelId}/messages?after=${messages[0].id}&limit=50`).responseText);
    }
}

DeleteAll();
