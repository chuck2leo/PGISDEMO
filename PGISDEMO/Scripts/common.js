
//格式化日期时间
function formatDateTime(d) {
    var dt = new Date(parseInt(d.substr(6, 13)));
    var date = dt.toLocaleDateString();
    var time = dt.toLocaleTimeString();
    var dateTime = date + ' ' + time;
    return dateTime;
}