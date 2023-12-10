export const DAILY_AMT = 10;
export const DAYS_FOR_BONUS = 1;
export const BONUS = 50;

export const determineDays = (lastSignIn: string) => {
  const day = 1000 * 60 * 60 * 24;

  const currentDate = new Date();
  const newDate = new Date(lastSignIn);

  //@ts-ignore
  return Math.round((currentDate - newDate) / day);
};
