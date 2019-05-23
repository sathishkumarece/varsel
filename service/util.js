
module.exports = {
    getSpecifiedDate: () => {
        let today = new Date();
        let month, year, date;
        year = today.getFullYear();
        month = today.getMonth();
        date = today.getDate();
        if ((month - 1) <= 0)
            year = today.getFullYear() - 1;
        var backdate = new Date(year, month - 1, date);
        return backdate;
    }
}