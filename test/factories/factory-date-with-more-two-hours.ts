export const makeDateWithMoreTwoHours = () => {
  const date = new Date();
  return new Date(date.setHours(date.getHours() + 2));
};
