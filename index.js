require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const token = process.env.DISCORD_TOKEN;
const openai_api_key = process.env.OPENAI_API_KEY;

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // Envoyer une requête à ChatGPT
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-4",
        messages: [{ role: "user", content: message.content }],
    }, {
        headers: {
            'Authorization': `Bearer ${openai_api_key}`,
        }
    });

    const reply = response.data.choices[0].message.content;

    message.reply(reply);
});

client.login(token);
