export function formatDate(date) {
  if (date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  } else {
    return null;
  }
}

export function parseDate(dateString: string): Date | null {
  console.log("dateString",dateString)
  if (dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    console.log(year, month, day);
    return new Date(year, month - 1, day);
  } else {
    return null;
  }
}
