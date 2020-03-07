const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    return message.channel.send("Goedendag, Antoon is een kale kanker knikker");

}

module.exports.help = {
    name: "Antoon"
}