import moment, { Moment } from "moment";
import { quarterNames } from "../lang.fr.js";
moment.locale("fr-FR");

interface QuarterPeriod {
    start: string;
    end: string;
    name: string;
}

interface NextQuarterPeriod {
    next: Moment;
    nextString: string;
    name: string;
}

const URSSAF_QUARTER_PLANNING = [
    ["0101", "0331"],
    ["0401", "0630"],
    ["0701", "0930"],
    ["1001", "1231"]
];

class QuarterPeriodProvider {

    private now: Moment;

    constructor() {
        this.now = moment();
    }

    private getQuarterPeriods(onNextYear?: boolean) : QuarterPeriod[] {
        const currentYear: number = this.now.year();
        return quarterNames
            .map((quarterName: string, index: number) =>{
                return {
                    start: currentYear + (onNextYear?1:0) + URSSAF_QUARTER_PLANNING[index][0],
                    end: currentYear + URSSAF_QUARTER_PLANNING[index][1],
                    name: quarterName,
                };
            });
    }

    public getCurrentQuarter() : {quarter: QuarterPeriod, index: number}|null {
        const quarterPeriods = this.getQuarterPeriods();
        let index: number = 0;
        const currentQuarter: QuarterPeriod | undefined = 
            quarterPeriods.find((quarterPeriod) => {
                const predictate = this.now.isAfter(moment(quarterPeriod.start))
                    && this.now.isBefore(moment(quarterPeriod.end));
                index += predictate ? 0 : 1;
                return predictate;
            });
        if(!currentQuarter) return null;
        return {quarter: currentQuarter, index};
    }

    public getNextDeclaration(): NextQuarterPeriod|null {
        const currentQuarterResult = this.getCurrentQuarter();
        if (!currentQuarterResult) return null;
        const {quarter, index} = currentQuarterResult;
        const nextIndex: number = (index + 1) % 4;
        const nextQuarterPeriod: QuarterPeriod =
            this.getQuarterPeriods(!nextIndex)[nextIndex];
        const nextDeclaration: Moment =
            moment(nextQuarterPeriod.start);
        return {
            nextString: this.now.to(nextDeclaration),
            next: nextDeclaration,
            name: quarter.name
        };
    }

    public isInDeclarationPeriod() {
        const nextDeclarationResult =
            this.getNextDeclaration();
        if (!nextDeclarationResult)
            return false;
        const monthsFromPeriod: number =
        this.now.diff(
            nextDeclarationResult.next,
            "M",
            true,
        );
        return  monthsFromPeriod <= 1
            && monthsFromPeriod > 0;
    }

}

export default new QuarterPeriodProvider();