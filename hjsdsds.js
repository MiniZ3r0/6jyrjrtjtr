const {EmbedBuilder, AttachmentBuilder} = require ("discord.js");
const generateImage = require("../utils/canvas/welcomeImage");
const invites = require("../utils/functions/invites");

module.exports =  async (member) => {
    const {client} = member;
    const welcomeChannelId = '1239926541157273692';
    const channel = await client.channels.fetch(welcomeChannelId);

    const usedInvite = await invites.getLastUsed(member.guild);

    const buffer = await generateImage(member);
    const attachment = new AttachmentBuilder(buffer, {
        name: "generated-image.png",
    });

    const embed = new EmbedBuilder().setTitle(`${member.user.displayName} bienvenido a la comunidad!`).setColor("Blurple").setDescription(`Nos alegramos de recibirte en la comunidad, recuerda hecharle un vistazo a los canales de verificación y chats del servidor para poder compartir experiencias con la comunidad!
    
    No te olvides de leer las <#1247508810734632960> para evitar cuialquier infracción. Esperamos que pases una buena estancia en nuestro servidor.`).setImage("attachment://generated-image.png");

    if(usedInvite && usedInvite.inviter) {
        embed.setFooter({
            text: `📥 Inviteado por ${usedInvite.inviter.username}!`,
        });
    }

    channel.send({
        content: `<@${member.user.id}>`,
        embeds: [embed],
        files: [attachment],
    });
};
