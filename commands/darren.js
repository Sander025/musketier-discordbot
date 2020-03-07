const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    return message.channel.send("Goedendag, Darren is de namaak van diktrom");

}

module.exports.help = {
    name: "Darren"
}