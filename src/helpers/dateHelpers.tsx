export const datePipe = (givenDate: any): string => {
    const d: Date = new Date(givenDate);
    const year = d.getFullYear();
    const month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
    const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    const fullDateString = year + '-' + month + '-' + day;
    let result = '';
    if (new Date().getTime() - d.getTime() <= 60000)
    {
        result = 'less than 1 minute ago';
    }
    else if (new Date().getTime() - d.getTime() <= 300000)
    {
        result = 'less than 5 minutes ago'
    }
    else if (new Date().getTime() - d.getTime() <= 3600000)
    {
        result = 'less than 1 hour ago'
    }
    else if (new Date().getTime() - d.getTime() <= 86400000)
    {
        result = 'yesterday'
    }
    else if (new Date().getTime() - d.getTime() <= 172800000)
    {
        result = '2 days ago'
    }
    else if (new Date().getTime() - d.getTime() <= 259200000)
    {
        result = '3 days ago'
    }
    else
    {
        result = fullDateString;
    }
    return result;
}
