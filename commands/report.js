const discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

    var prefix = botconfig.prefix;

    if (!args[0]) return message.channel.send(`*__VOORBEELD__* \n\n** ${prefix}report __[@naam] [reden]__**`);

    var user = message.guild.member(message.mentions.users.first());

    if (!user) return message.channel.send(`Ongeldig gebruiker ingevoerd, geef a.u.b een geldige gebruiker op.`);

    var reason = args.join(" ").slice(22);

    if (!user) return message.channel.send(`Géén reden opgegeven, geef a.u.b een reden op.`);

    var reportEmbed = new discord.RichEmbed()
        .setDescription("Gebruiker heeft een report ontvangen")
        .setColor("fc9803")
        .addField("Gebruiker:", `${user}`)
        .addField("Reported door:", `${message.author}`)
        .addField("Reden:", reason);

    var reportChannel = message.guild.channels.find("name", "report-logs");
    if (!reportChannel) return message.channel.send(`Kan het kanaal niet vinden`)

    message.delete();

    return reportChannel.send(reportEmbed);

}

module.exports.help = {
    name: "report"
}