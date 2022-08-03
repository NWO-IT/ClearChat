async function DeleteAll() {
    const channelId = document.URL.substr(document.URL.indexOf("@me/") + 4);
    const token = (webpackChunkdiscord_app.push([[''], {}, e => {
        m = [];
        for(let c in e.c) m.push(e.c[c])
    }]), m).find(m => m?.exports?.default?.getToken !== void 0).exports.default.getToken();
    const avatar = document.getElementsByClassName("avatarWrapper-1B9FTW")[0].getElementsByTagName("img")[0].src;
    const beginIndex = "https://cdn.discordapp.com/avatars/".length;
    const userId = avatar.substr(beginIndex, avatar.lastIndexOf("/") - beginIndex);
    const sleep = ms => new Promise(r => setTimeout(r, ms));

    function request(method, url) {
        let req = new XMLHttpRequest();
        req.open(method, url, false);
        req.setRequestHeader("authorization", token);
        req.send();
        return req;
    }

    let messages = JSON.parse(request("GET", `https://discord.com/api/v9/channels/${channelId}/messages?limit=100`).responseText);
    while(messages.length !== 0){
        for(const msg of messages){
            if(msg.author.id !== userId){
                continue;
            }

            while(request("DELETE", `https://discord.com/api/v9/channels/${channelId}/messages/${msg.id}`).status === 429){
                await sleep(10000);
            }
            await sleep(1000);
        }

        messages = JSON.parse(request("GET", `https://discord.com/api/v9/channels/${channelId}/messages?before=${messages[messages.length - 1].id}&limit=100`).responseText);
    }
}

DeleteAll();
