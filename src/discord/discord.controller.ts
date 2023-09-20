import { Interaction } from "discord.js";
import { getNextDeclarationEmbed } from "../urssaf/urssaf.embed.js";

export default async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if(interaction.commandName === "status") {
        await interaction.reply("Informations : Déclaration Trimestrielle");
        if (interaction.channel) {
            await interaction.channel.send({embeds: [getNextDeclarationEmbed(interaction.user)]});
        } else {
            interaction.user.send({embeds: [getNextDeclarationEmbed(interaction.user)]});
        } 
    }
};