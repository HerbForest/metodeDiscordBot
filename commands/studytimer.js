const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('studietid')
        .setDescription('Starter en 25-minutters studietid med en timer.'),
    async execute(interaction) {
        // Svar til brugeren, at timeren er startet
        await interaction.reply('Studietid er startet! Jeg giver besked om 25 minutter.');

        // 25 minutter i millisekunder
        const studyTime = 25 * 60 * 1000;

        // Timeren, der sender besked efter 25 minutter
        setTimeout(async () => {
            await interaction.followUp('Studietid er slut! 🎉');
        }, studyTime);
    },
};