const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("studietimer")
        .setDescription("Sets a countdown timer for study time"),
    
    async execute(interaction) {
        await interaction.reply("study time started!");
        // You can add more code here for the countdown functionality.
    },
};