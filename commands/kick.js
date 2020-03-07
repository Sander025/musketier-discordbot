const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    try {

        var kickUser = message.guild.member(message.mentions.users.first() || message.guild.member(arguments[0]));

        if (!kickUser) return message.channel.send("Geef a.u.b een geldig gebruiker op. \n\n**!kick __[@naam] [reden]__**");

        var reason = arguments.join(" ").slice(22);

        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Sorry, je hebt onvoldoende rechten hiervoor.");

        if (kickUser.hasPermission("ADMINISTRATOR")) return message.channel.send("Je kunt deze gebruiker niet kicken");

        var kick = new discord.RichEmbed()
            .setDescription("Gebruiker is gekicked van de server")
            .setColor("#ee0000")
            .addField("Naam:", kickUser)
            .addField("Reden:", reason)
            .addField("Gekicked door:", message.author);

        var kickChannel = message.guild.channels.find(`name`, "kick-logs");
        if (!kickChannel) return message.guild.send("Kan het kanaal niet vinden");

        message.guild.member(kickUser).kick(reason);

        kickChannel.send(kick);

    } catch (error) {

        return message.channel.send("Geef a.u.b een geldig gebruiker op");

    }

    return;


}

module.exports.help = {
    name: "kick"
}