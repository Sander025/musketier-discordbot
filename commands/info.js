const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var botIcon = bot.user.displayAvatarURL;

    var botEmbed = new discord.RichEmbed()
        .setDescription("Bot Informatie")
        .setColor("#14db81")
        .setThumbnail(botIcon)
        .addField("Bot naam", bot.user.username)
        .addField("Gemaakt door:", "@Jordy#7283")
        .addField("Gemaakt op", bot.user.createdAt)
        .addField("Versie", "1.0.0");

    return message.channel.send(botEmbed);

}

module.exports.help = {
    name: "info"
}