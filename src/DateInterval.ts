export class DateInterval {
    startDate: string;
    endDate: string;

    constructor(startDate: string, endDate: string) {
        this.startDate = startDate;
        this.endDate = endDate
    }

    // Get the over lap between each two DateIntervals
    public overlap(dateInterval: DateInterval): DateInterval|false {
        const startDate1String: string = this.startDate;
        const startDate1: Date = new Date(startDate1String);

        const startDate2String: string = dateInterval.startDate;
        const startDate2: Date = new Date(startDate2String);

        const endDate1String: string = this.endDate;
        const endDate1: Date = new Date(endDate1String);

        const endDate2String: string = dateInterval.endDate;
        const endDate2: Date = new Date(endDate2String);

        if (startDate2 > endDate1 || startDate1 > endDate2) {
            return false;
        }

        const overlappedStartDate: Date = startDate2 > startDate1 ? startDate2 : startDate1;
        const overlappedEndDate: Date = endDate1 < endDate2 ? endDate1 : endDate2;

        return new DateInterval(overlappedStartDate.toISOString(), overlappedEndDate.toISOString());
    }

    // Create an iterable object that will hold the overlapping between each two intervals if exists
    public static *overlapTwoWorkers(dateIntervals1: DateInterval[], dateIntervals2: DateInterval[]): IterableIterator<DateInterval> {
        for (let dateInterval1 of dateIntervals1) {
            for (let dateInterval2 of dateIntervals2) {
                const overlap = dateInterval1.overlap(dateInterval2);
                if (overlap) {
                    yield overlap;
                }
            }
        }
    }

    // Get all the overlaps between all array of the DateIntervals arrays
    public static overlapAll(intervals: DateInterval[][]): DateInterval[] {
        return intervals.reduce((a, b) => Array.from(this.overlapTwoWorkers(a,b)))
    }
}
