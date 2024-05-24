require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: 'wavbot',
        description: 'Posez une question à ChatGPT',
        options: [
            {
                name: 'question',
                type: 3, // TYPE_STRING
                description: 'La question à poser à ChatGPT',
                required: true,
            },
        ],
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
