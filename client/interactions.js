import {getNextDeclarationEmbed} from "./src/urssaf_embed.js";

export default async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if(interaction.commandName === 'status') {
        await interaction.reply('Informations : Déclaration Trimestrielle')
        await interaction.channel.send({embeds: [getNextDeclarationEmbed(interaction.user)]})
    }
};