const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Sorry, je hebt onvoldoende rechten hiervoor.");

    var user = message.guild.member(message.mentions.users.first());

    if (!user) return message.channel.send("*__VOORBEELD__* \n\n**!tempban __[@naam] [5m] [Schelden]__** \n\n **__Timeframes__** \n*Gebruik alleen de begin__letter__* \n\n **S**econds \n **M**inutes \n **H**ours \n **M**onths \n **Y**ears");

    if (user.hasPermission("ADMINISTRATOR")) return message.channel.send("Je kunt deze gebruiker niet tempbannen");

    var tempBanTime = args[1];

    var reason = args.join(" ").slice(22);

    if (!reason) return message.channel.send("Geef a.u.b een geldige reden op.");

    if (ms(tempBanTime)) {

        await message.guild.member(user).ban(reason);

        message.channel.send(`${user} is verbannen voor ${tempBanTime} met als reden ${reason}.`);

        setTimeout(function () {

            message.guild.unban(user.id);

            message.channel.send(`${user} is geunbanned.`);

        }, ms(tempBanTime));



    } else {
        return message.channel.send("Geef een geldig tijdsduur op.")
    }

}

module.exports.help = {
    name: "tempban"
}