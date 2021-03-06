export const fragmentDate = (date: Date): [number, number, number] =>
  [date.getFullYear(), date.getMonth() + 1, date.getDate()];

export const stringifyDate = (
  date: Date,
  { padded = false, friendly = false }: { padded?: boolean, friendly?: boolean } = {},
): string => {
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

export const parseMaybeDate = (dateString: string): Date | undefined => {
  const timestamp = Date.parse(dateString);
  if (!isNaN(timestamp)) {
    return new Date(timestamp);
  }

  return undefined;
};

export const validateDate = (dateString: string): boolean => {
  // TODO: A better regex; better date validation across the whole app in general
  const regex = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;

  return regex.exec(dateString) !== null;
};

export const areDatesEqual = (date1?: Date, date2?: Date): boolean => {
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

export const daysInYear = 365.242199;

export const getApproximateNumYearsForNumDays = (numDays: number) => {
  return +(Math.round(Number((numDays / daysInYear).toString() + "e+2")) + "e-2");
};
