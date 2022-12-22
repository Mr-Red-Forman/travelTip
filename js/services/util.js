export const util = {
    createFormatedDate
}

function createFormatedDate(date) {
    const formatedDate = new Intl.DateTimeFormat('en').format(date)
    const options = {
        hour: '2-digit',
        minute: '2-digit'
    }
    const formatedTime = new Intl.DateTimeFormat('he', options).format(date)
    return formatedDate + ', ' + formatedTime
}