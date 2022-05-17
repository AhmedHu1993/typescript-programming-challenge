import {readFileSync} from "fs";
import {DateInterval} from "./DateInterval";

export async function solveFirstQuestion(
  inputFilePath: string
): Promise<string> {
  const dataArray: string[] = readFileSync(inputFilePath).toString().split("\n");

  let earliest: Date | null = null;
  for (let interval of dataArray) {
    const datesString: string = interval.substring(interval.indexOf('[') + 1, interval.indexOf(']'));
    const dateArray: string[] = datesString.split(',');

    for (let date of dateArray) {
      const dateString: string = date.substring(0, date.indexOf('/'));
      const intervalDate: Date = new Date(dateString);

      if (earliest === null || intervalDate < earliest) {
        earliest = intervalDate;
      }
    }
  }

  return earliest === null ? 'No Dates Found' : earliest.toISOString();
}

export async function solveSecondQuestion(
  inputFilePath: string
): Promise<string> {
  const dataArray: string[] = readFileSync(inputFilePath).toString().split("\n");

  let latest: Date | null = null;
  for (let interval of dataArray) {
    const datesString: string = interval.substring(interval.indexOf('[') + 1, interval.indexOf(']'));
    const dateArray: string[] = datesString.split(',');

    for (let date of dateArray) {
      const dateString: string = date.substring(date.indexOf('/') + 1);
      const intervalDate: Date = new Date(dateString);

      if (latest === null || intervalDate > latest) {
        latest = intervalDate;
      }
    }
  }

  return latest === null ? 'No Dates Found' : latest.toISOString();
}

export async function solveThirdQuestion(
  inputFilePath: string
): Promise<string[]> {
  const dataArray: string[] = readFileSync(inputFilePath).toString().split("\n");

  let allIntervals: DateInterval[][] = [];
  for (let interval of dataArray) {
    const datesString: string = interval.substring(interval.indexOf('[') + 1, interval.indexOf(']'));
    const dateArray: string[] = datesString.split(',');

    let workerIntervals: DateInterval[] = []
    for (let date of dateArray) {
      const startDateString: string = date.substring(0, date.indexOf('/'));
      const endDateString: string = date.substring(date.indexOf('/') + 1);

      const newDateInterval: DateInterval = new DateInterval(startDateString, endDateString)
      workerIntervals.push(newDateInterval)
    }
    allIntervals.push(workerIntervals)
  }

  const result = DateInterval.overlapAll(allIntervals);

  return result.map(dataInterval => `${dataInterval.startDate}/${dataInterval.endDate}`);
}
