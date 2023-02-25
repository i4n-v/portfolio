function getAgeByDate(date: string) {
  const birthDate = new Date(date);
  const miliseconds = Date.now() - birthDate.getTime();
  const ageDate = new Date(miliseconds);

  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export default getAgeByDate;
