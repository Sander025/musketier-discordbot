const discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("Sorry, je hebt onvoldoende rechten hiervoor.");

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!user) return message.channel.send("*__VOORBEELD__* \n\n**!tempmute __[@naam] [5m]__** \n\n **__Timeframes__** \n*Gebruik alleen de begin__letter__* \n\n **S**econds \n **M**inutes \n **H**ours \n **M**onths \n **Y**ears");

    if (user.hasPermission("ADMINISTRATOR")) return message.channel.send("Je kunt deze gebruiker __niet__ tempmuten");

    var muteRole = message.guild.roles.find("name", "muted");

    if (!muteRole) return message.channel.send("De role __muted__ is niet gevonden.");

    var muteTime = args[1];

    if (!muteTime) return message.channel.send("Geef een geldig tijdsduur op.");

    await (user.addRole(muteRole.id));

    message.channel.send(`${user} is gemuted voor ${muteTime}`);

    setTimeout(function () {

        user.removeRole(muteRole.id);

        message.channel.send(`${user} is unmuted.`);

    }, ms(muteTime));

}

module.exports.help = {
    name: "tempmute"
}