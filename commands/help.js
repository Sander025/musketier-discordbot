const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    try {

        var text = new discord.RichEmbed()
            .setDescription("**Musketier bot commands**")
            .setColor("#f5b942")
            .addField("**__Commands__** \n\n !help \n !info \n !ping \n\n **__Staff commands__** \n\n !clear \n !warn [naam] [reden] \n !tempmute [naam] [tijdsduur] [reden] \n !mute [naam] [reden] \n !kick [naam] [reden] \n !tempban [naam] [tijdsduur] [reden] \n !ban [naam] [reden]");

        message.author.send(text);

        message.channel.send("Je hebt een privé bericht ontvangen.");

    } catch (error) {
        message.channel.send("Sorry, er is iets fout gegaan.")
    }

}

module.exports.help = {
    name: "help"
}