const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Sorry, je hebt onvoldoende rechten hiervoor.");

    var splitser = "-";

    if (args[0] == null) {

        var useMessage = new discord.RichEmbed()
            .setTitle("Foutmelding")
            .setColor("#ee0000")
            .setDescription(`Maak een mededeling door gebruik te maken van: \n\n **!mededeling __[Titel]__ ${splitser} __[Bericht]__**`);

        return message.channel.send(useMessage);

    }

    args = args.join(" ").split(splitser);

    var options = {

        titel: args[0] || "Mededeling",
        bericht: args[1] || "Geen bericht opgegeven",

    }

    var announcer = message.author;

    var announcementEmbed = new discord.RichEmbed()
        .setTitle("Mededeling")
        .setColor("#0394fc")
        .setDescription(`Van: ${announcer} \n\n ${options.titel} \n\n ${options.bericht} \n`)
        .setTimestamp();

    var announcementChannel = message.guild.channels.find(`name`, "informatie");
    if (!announcementChannel) return message.channel.send("Kan het kanaal niet vinden.");

    announcementChannel.send(announcementEmbed);

}

module.exports.help = {
    name: "mededeling"
}