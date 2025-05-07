import moment from 'moment';

export const addOneDayToDate = (date: string) => {
  if (date) {
    const newDate = new Date(date);
    const currentDate = new Date();
    newDate.setDate(newDate.getDate() + 1);
    currentDate.setDate(currentDate.getDate() + 1);
    if (newDate > currentDate) {
      return currentDate.toISOString().split('T')[0];
    }
    return newDate.toISOString().split('T')[0];
  }
};

export const addDayToDate = (date: string, numberOfDays: number = 1) => {
  if (date) {
    const newDate = new Date(date);
    const currentDate = new Date();
    newDate.setDate(newDate.getDate() + numberOfDays);
    currentDate.setDate(currentDate.getDate() + numberOfDays);
    if (newDate > currentDate) {
      return currentDate.toISOString().split('T')[0];
    }
    return newDate.toISOString().split('T')[0];
  }
};

export const getDateDifference = (startDate: string, endDate: string) => {
  const date1 = moment(startDate); // Start date
  const date2 = moment(endDate); // End date

  const years = date2.diff(date1, 'years');
  date1.add(years, 'years'); // Move date1 forward by counted years

  const months = date2.diff(date1, 'months'); // Remaining months

  const result = [];

  if (years > 0) {
    result.push(`${years} year${years > 1 ? 's' : ''}`);
  }

  if (months > 0) {
    result.push(`${months} month${months > 1 ? 's' : ''}`);
  }

  return result;
};

export const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-GB').replace(/\//g, '-');
