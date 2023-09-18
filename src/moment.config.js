import moment from 'moment';
moment.locale('fr-FR');
console.log(moment().format('Do MMMM YYYY, h:mm:ss a'));

const quarterPeriods = [
    {
        start: () => moment().year() + "0101",
        end: () => moment().year() + "0331",
        name: "Premier trimestre",
    },
    {
        start: () => moment().year() + "0401",
        end: () => moment().year() + "0630",
        name: "Deuxième trimestre",
    },
    {
        start: () => moment().year() + "0701",
        end: () => moment().year() + "0930",
        name: "Troisième trimestre"
    },
    {
        start: () => moment().year() + "1001",
        end: () => moment().year() + "1231",
        name: "Quatrième trimestre",
    }
]

export function getCurrentQuarter() {
    const now = moment();
    for (const quarter of quarterPeriods) {
        if (
            now.isAfter(moment(quarter.start()))
            && now.isBefore(moment(quarter.end()))
        ) return quarter;
    }
}

export function getNextDeclaration() {
    const quarter = getCurrentQuarter()
    const nextDeclaration = moment(quarter.start());
    return {
        nextString: moment().from(nextDeclaration),
        next: nextDeclaration,
        name: quarter.name
    };
}

export function isInDeclarationPeriod() {
    const {next} = getNextDeclaration();
    return moment().diff(next, "M") <= 1
}
