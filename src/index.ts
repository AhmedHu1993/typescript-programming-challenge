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
    // Getting all dates as a string in the interval
    const datesString: string = interval.substring(interval.indexOf('[') + 1, interval.indexOf(']'));
    // From String to Dates Array
    const dateArray: string[] = datesString.split(',');

    let workerIntervals: DateInterval[] = []
    for (let date of dateArray) {
      // Get the start date for each interval
      const startDateString: string = date.substring(0, date.indexOf('/'));
      // Get the end date of each interval
      const endDateString: string = date.substring(date.indexOf('/') + 1);

      /* Create a new DateInterval Class to hold the start date and the end date,
      and to ease the overlap between the intervals */
      const newDateInterval: DateInterval = new DateInterval(startDateString, endDateString)
      workerIntervals.push(newDateInterval)
    }
    // Create an array of dataIntervals array, to match the number of workers' interval.
    allIntervals.push(workerIntervals)
  }

  // Get the result as array of DataInterval array
  const result: DateInterval[] = DateInterval.overlapAll(allIntervals);
  // Cast the DateInterval to startDate/endDate string
  return result.map(dataInterval => `${dataInterval.startDate}/${dataInterval.endDate}`);
}
