export const makeDateWithMoreHours = (hoursToAdd: number) => {
  const date = new Date();
  return new Date(date.setHours(date.getHours() + hoursToAdd));
};
