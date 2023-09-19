import moment from 'moment';
moment.locale('fr-FR');
console.log(moment().format('Do MMMM YYYY, h:mm:ss a'));

const quarterPeriods = [
    {
        start: (next=false) => (moment().year() + (next?1:0)) + "0101",
        end: () => moment().year() + "0331",
        name: "Premier trimestre",
    },
    {
        start: (next=false) => (moment().year() + (next?1:0)) + "0401",
        end: () => moment().year() + "0630",
        name: "Deuxième trimestre",
    },
    {
        start: (next=false) => (moment().year() + (next?1:0)) + "0701",
        end: () => moment().year() + "0930",
        name: "Troisième trimestre"
    },
    {
        start: (next=false) => (moment().year() + (next?1:0)) + "1001",
        end: () => moment().year() + "1231",
        name: "Quatrième trimestre",
    }
]

export function getCurrentQuarter() {
    const now = moment();
    let index = 0;
    for (const quarter of quarterPeriods) {
        if (
            now.isAfter(moment(quarter.start()))
            && now.isBefore(moment(quarter.end()))
        ) return {quarter, index};
        index++;
    }
}

export function getNextDeclaration() {
    const {quarter, index} = getCurrentQuarter()
    const nextIndex = (index + 1) % 4;
    const nextDeclaration = moment(quarterPeriods[nextIndex].start(!nextIndex));
    return {
        nextString: moment().to(nextDeclaration),
        next: nextDeclaration,
        name: quarter.name
    };
}

export function isInDeclarationPeriod() {
    const {next} = getNextDeclaration();
    const monthsFromPeriod = moment().diff(next, "M", true);
    return  monthsFromPeriod <= 1 && monthsFromPeriod > 0
}
