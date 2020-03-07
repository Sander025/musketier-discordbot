const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    try {

        var banUser = message.guild.member(message.mentions.users.first() || message.guild.member(arguments[0]));

        if (!banUser) return message.channel.send("Geef a.u.b een geldig gebruiker op. \n\n**!ban __[@naam] [reden]__**");

        var reason = arguments.join(" ").slice(22);

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Sorry, je hebt onvoldoende rechten hiervoor.");

        if (banUser.hasPermission("ADMINISTRATOR")) return message.channel.send("Je kunt deze gebruiker niet bannen");

        var ban = new discord.RichEmbed()
            .setDescription("Gebruiker is verbannen van de server")
            .setColor("#ee0000")
            .addField("Naam:", banUser)
            .addField("Verbannen door:", message.author)
            .addField("Reden:", reason);

        var banChannel = message.guild.channels.find(`name`, "ban-logs");
        if (!banChannel) return message.guild.send("Kan het kanaal niet vinden");

        message.guild.member(banUser).ban(reason);

        banChannel.send(ban);

    } catch (error) {

        return message.channel.send("Geef a.u.b een geldig gebruiker op");

    }

    return;


}

module.exports.help = {
    name: "ban"
}