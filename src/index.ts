export async function solveFirstQuestion(
  inputFilePath: string
): Promise<string> {
  const fs = require('fs');
  const dataArray: string[] = fs.readFileSync(inputFilePath).toString().split("\n");

  let earliest: Date = new Date('2030-12-10T12:00:00')
  for(let interval of dataArray) {
    const datesString: string = interval.substring(interval.indexOf('[') + 1, interval.indexOf(']'));
    const dateArray: string[] = datesString.split(',');

    for (let date of dateArray) {
      const dateString: string = date.substring(0, date.indexOf('/'));
      const intervalDate: Date = new Date(dateString);

      if (intervalDate < earliest) {
        earliest = intervalDate;
      }
    }
  }

  return earliest.toISOString();
}

export async function solveSecondQuestion(
  inputFilePath: string
): Promise<string> {
  // TODO: Solve me!
  return "";
}

export async function solveThirdQuestion(
  inputFilePath: string
): Promise<string[]> {
  // TODO: Solve me!
  return [];
}
