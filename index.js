require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const token = process.env.DISCORD_TOKEN;
const openai_api_key = process.env.OPENAI_API_KEY;

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    if (commandName === 'wavbot') {
        const question = options.getString('question');
        console.log('Question received:', question); // Ajoutez ce log pour vérifier la question

        try {
            // Envoyer une requête à ChatGPT
            const response = await axios.post('https://api.openai.com/v1/completions', {
                model: "gpt-4",
                prompt: question,
                max_tokens: 150,
                n: 1,
                stop: null,
                temperature: 0.7,
            }, {
                headers: {
                    'Authorization': `Bearer ${openai_api_key}`,
                }
            });

            console.log('Response received from OpenAI:', response.data); // Ajoutez ce log pour vérifier la réponse

            const reply = response.data.choices[0].text.trim();
            await interaction.reply(reply);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message); // Ajoutez ce log pour vérifier l'erreur
            await interaction.reply('Désolé, une erreur est survenue en traitant votre demande.');
        }
    }
});

client.login(token);
