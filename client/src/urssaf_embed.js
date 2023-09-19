import {getNextDeclaration, isInDeclarationPeriod} from "./moment.config.js";

export function getNextDeclarationEmbed(user) {
    const nextDeclaration = getNextDeclaration();
    return {
        color: 0x0099ff,
        thumbnail: {
            url: 'https://open.urssaf.fr/assets/metadata_theme_picto/Urssaffavicon_redim.png',
        },
        fields: [
            {
                name: `Configuration : @${user.tag}`,
                value: 'Trimestriel',
            },
            {
                name: 'Période actuelle',
                value: nextDeclaration.name,
            },
            {
                name: 'Prochaine échéance',
                value: nextDeclaration.nextString,
                inline: true,
            },
            {
                name: 'Date exacte',
                value: nextDeclaration.next.format("DD MMMM"),
                inline: true,
            },
        ],
        title: isInDeclarationPeriod() ? "C'est l'heure de déclarer !" : "Pas besoin de déclarer",
        timestamp: new Date().toISOString(),
    };
}
