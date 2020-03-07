const discord = require("discord.js");
const fs = require("fs");

const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Sorry, je hebt onvoldoende rechten hiervoor.");

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!user) return message.channel.send("Geef a.u.b een geldig gebruiker op. \n\n**!warn __[@naam] [reden]__**");

    if (user.hasPermission("ADMINISTRATOR")) return message.channel.send("Je kunt deze gebruiker niet warnen");

    var reason = args.join(" ").slice(22);

    if (!reason) return message.channel.send("Geef een geldige reden door.");

    if (!warns[user.id]) warns[user.id] = {
        warns: 0
    };

    warns[user.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

    var warnEmbed = new discord.RichEmbed()
        .setDescription("Gebruiker heeft een warning ontvangen")
        .setColor("#ee0000")
        .addField("Naam:", user)
        .addField("Aantal warns:", warns[user.id].warns)
        .addField("Reden:", reason)
        .addField("Gewarned door:", message.author);

    var warnChannel = message.guild.channels.find(`name`, "warn-logs");
    if (!warnChannel) return message.guild.send("Kan het kanaal niet vinden");

    warnChannel.send(warnEmbed);

    if (warns[user.id].warns === 3) {

        var warnbericht = new discord.RichEmbed()
            .setDescription("**__!!LET OP!!__**" + user)
            .setColor("#ee0000")
            .addField("Bericht:", "Krijg jij nog één warn dan zal je verbannen worden.");

    } else if (warns[user.id].warns === 4) {

        message.guild.member(user).ban(reason);
        message.channel.send(`${user} is verbannen van de discord.`);

    }


}

module.exports.help = {
    name: "warn"
}