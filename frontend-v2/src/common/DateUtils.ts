export const fragmentDate = (date: Date): [number, number, number] => {
  const fragments = date.toISOString()
                        .substring(0, 10)
                        .split("-")
                        .map((f) => Number(f));

  // We lose a day during the conversion to ISO string for some reason
  return [fragments[0], fragments[1], fragments[2] + 1];
};

export const stringifyDate = (date: Date, padded: boolean = false, friendly: boolean = false): string => {
  let [year, month, day] = fragmentDate(date).map((f) => f.toString());

  const pad = (n: string, width: number): string => {
    return ("0".repeat(width) + n).slice(-width);
  };

  if (padded) {
    year = pad(year, 4);
    month = pad(month, 2);
    day = pad(day, 2);
  }

  if (friendly) {
    return [day, month, year].join("/");
  } else {
    return [year, month, day].join("-");
  }
};

export const parseDate = (dateString: string): Date | undefined => {
  if (validateDate(dateString)) {
    const parts: number[] = dateString.split("-").map((part) => Number(part));

    return new Date(parts[0], parts[1] - 1, parts[2]);
  }

  return undefined;
};

export const validateDate = (dateString: string): boolean => {
  // TODO: A better regex; better date validation across the whole app in general
  const regex = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;

  return regex.exec(dateString) !== null;
};

export const areDatesEqual = (date1: Date | undefined, date2: Date | undefined): boolean => {
  return date1 && date2 && date1.getTime() === date2.getTime();
};

export enum DatePlacement {
  Before,
  Between,
  After,
}

export const getDatePlacement = (date: Date, from: Date, to: Date): DatePlacement => {
  if (date.getTime() < from.getTime()) {
    return DatePlacement.Before;
  } else if (date.getTime() > to.getTime()) {
    return DatePlacement.After;
  } else {
    return DatePlacement.Between;
  }
};

export const isDateBetween = (date: Date, from: Date, to: Date): boolean => {
  return getDatePlacement(date, from, to) === DatePlacement.Between;
};

const milisecondsInDay = 1000 * 60 * 60 * 24;

export const getNumDaysBetween = (from: Date, to: Date): number => {
  return Math.round((to.getTime() - from.getTime()) / milisecondsInDay);
};
