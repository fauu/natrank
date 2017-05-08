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

export const parseDate = (dateString: string): Date => {
  const parts: number[] = dateString.split("-").map((part) => Number(part));

  return new Date(parts[0], parts[1] - 1, parts[2]);
};
