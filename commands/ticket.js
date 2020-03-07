const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    const categoryId = "684471052830507038";

    var userName = message.author.username;
    var userDiscriminator = message.author.Discriminator;

    var bool = false;

    message.guild.channels.forEach((channel) => {

        if (channel.name == userName.toLowerCase() + "-" + userDiscriminator) {

            message.channel.send("Je hebt al een ticket open staan, sluit deze eerst af om een nieuwe aan te kunnen maken.");

            bool = true;

        }

    });

    if (bool == true) return;

    var embedCreateTicket = new discord.RichEmbed()
        .setTitle("Bedankt voor je aanvraag,\n\n" + message.author.username)
        .setThumbnail(message.author.displayAvatarURL)
        .setFooter("Je ticket is zojuist aangemaakt.");

    message.channel.send(embedCreateTicket);

    message.guild.createChannel(userName + "-" + userDiscriminator, "text").then((createdChan) => {

        createdChan.setParent(categoryId).then((settedParent) => {

            settedParent.overwritePermissions(message.guild.roles.find('name', "@everyone"), { "READ_MESSAGES": false });

            settedParent.overwritePermissions(message.author, {

                "READ_MESSAGES": true, "SEND_MESSAGES": true,
                "ATTACH_FILES": true, "CONNECT": true,
                "CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": true

            });

            var embedParent = new discord.RichEmbed()
                .setTitle("Bedankt voor je ticket,\n\n" + message.author.username.toString())
                .setDescription("Leg je klacht/vraag zo duidelijk mogelijk uit.");

            settedParent.send(embedParent);
        }).catch(err => {
            message.channel.send("Er is een fout opgetreden.");
        });

    }).catch(err => {
        message.channel.send("Er is een fout opgetreden.");
    });

}

module.exports.help = {
    name: "ticket",
    description: "Maak een ticket aan"
}