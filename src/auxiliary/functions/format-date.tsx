const getDateMonth = (month: number) => {
    switch(month) {
        case 1:
            return 'January'
        case 2:
            return 'February'
        case 3:
            return 'March'
        case 4:
            return 'April'
        case 5:
            return 'May'
        case 6:
            return 'June'
        case 7:
            return 'July'
        case 8:
            return 'August'
        case 9:
            return 'September'
        case 10:
            return 'October'
        case 11:
            return 'November'
        case 12:
            return 'December'
        default:
            throw new Error(`${month} is not a valid month number`);
    }
}

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${getDateMonth(date.getMonth() + 1)} ${date.getDate()}, ${date.getFullYear()}`;
}