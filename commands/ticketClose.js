const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    const categoryId = "684471052830507038";

    if (message.channel.parentID == categoryId) {

        message.channel.delete();

    } else {

        message.channel.send("Voer deze command uit in jouw ticket.")

    }

    var embedCloseTicket = new discord.RichEmbed()
        .setTitle("Ticket:  " + message.channel.name)
        .setDescription("Ticket is **succesvol** afgerond.")
        .setFooter("Ticket is succesvol gesloten.");

    var ticklog = message.guild.channels.find("name", "ticket-logs");
    if (!ticklog) return message.channel.send("Kan het kanaal niet vinden");

    ticklog.send(embedCloseTicket);

}

module.exports.help = {
    name: "close"
}