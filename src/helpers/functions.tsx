export const datePipe = (dataString: any) => {
    const d: Date = new Date(dataString);
    const year = d.getFullYear();
    const month = d.getMonth() < 10 ? '0' + d.getMonth() : d.getMonth();
    const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    return year + '-' + month + '-' + day;
}
