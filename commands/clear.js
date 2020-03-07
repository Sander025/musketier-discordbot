const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Sorry, je hebt hier geen rechten voor.").then(msg => msg.delete(5000));

    if (!args[0]) return message.channel.send("Geef een geldig aantal door. \n\n**!clear __1 t/m 99__**")

    if (Number.isInteger(parseInt(args[0]))) {

        var amount = parseInt(args[0]) + 1;

        message.channel.bulkDelete(amount).then(() => {

            if (args[0] == 0) {

                message.channel.send(`Geef een geldig aantal door. \n\n**!clear __1 t/m 99__**`).then(msg => msg.delete(5000));

            } else if (args[0] == 1) {

                message.channel.send(`Succesvol **__1 bericht__** verwijderd.`).then(msg => msg.delete(5000));

            } else {

                message.channel.send(`Succesvol **__${args[0]} berichten__** verwijderd.`).then(msg => msg.delete(5000));

            }


        });

    } else {
        return message.channel.send("Geef een getal op.")
    }

}

module.exports.help = {
    name: "clear"
}