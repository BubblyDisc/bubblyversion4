const mongoose = require('mongoose')
const dbots = require('dbots')

module.exports = {
    name: 'ready',
    run: async (client, statcordClient) => {
        client.manager.init(client.user.id);
        statcordClient.autopost()
        
        const poster = new dbots.Poster({
            client,
            apiKeys: {
                topgg: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc2MzQyMDQ3MjY2NjM1NzgxMSIsImJvdCI6dHJ1ZSwiaWF0IjoxNjE1NjE5NTcyfQ.Hb1KVDh6XcE4qFDdvynpwgjOinSz1AbzwPFFIfQ47ao',
                DiscordBotList: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0IjoxLCJpZCI6Ijc2MzQyMDQ3MjY2NjM1NzgxMSIsImlhdCI6MTYxNTYyMDE4M30.dwlRzYreKwdFbxN-rDabSpFISFXjoOXZ6nyP_FWI9LY'
            },
            clientLibrary: 'discord.js',
            serverCount: async () => client.guilds.cache.size.toLocaleString(),
        })

        function pickStatus() {
            let status = [`🪦 I have shutdown due`, `Good Bye 🪦`]
            let Status = Math.floor(Math.random() * status.length);

            client.user.setActivity(status[Status], {
                type: "LISTENING"
            });
        };
        
        setInterval(pickStatus, 30000);

        try {
            poster.startInterval()

            console.log('✅ Api connected')
        } catch (err) {
            console.log(`❎ Api: ${err}`)
        }
    }
}
