const { SlashCommandBuilder } = require("discord.js");

let timers = {}; // Gemmer aktive timers baseret på brugerens ID

module.exports = {
    data: new SlashCommandBuilder()
        .setName("studietimer")
        .setDescription("Sets a countdown timer for study time")
        .addIntegerOption(option =>
            option
                .setName("timer")
                .setDescription("Set the countdown time in minutes")
                .setRequired(true)
        ),

    async execute(interaction) {
        const timeInMinutes = interaction.options.getInteger("timer");

        if (timeInMinutes <= 0) {
            return interaction.reply("Please enter a positive number of minutes!");
        }

        const userId = interaction.user.id;

        // Hvis brugeren allerede har en aktiv timer
        if (timers[userId]) {
            return interaction.reply("You already have an active timer!");
        }

        const endTime = Date.now() + timeInMinutes * 60 * 1000;
        timers[userId] = {
            endTime,
            interval: null,
        };

        await interaction.reply(`⏳ Study timer started! Timer set for ${timeInMinutes} minutes.`);

        // Start et interval for at give opdateringer
        timers[userId].interval = setInterval(async () => {
            const remainingTime = endTime - Date.now();

            if (remainingTime <= 0) {
                clearInterval(timers[userId].interval);
                delete timers[userId];
                await interaction.followUp("⏰ Time's up! Great job studying! 🎉");
                return;
            }

            // Opdatering hvert minut
            const minutesLeft = Math.ceil(remainingTime / (1000 * 60));
            await interaction.followUp(`🕒 ${minutesLeft} minutes remaining.`);
        }, 60 * 1000); // Sender opdateringer hvert minut
    },
};
