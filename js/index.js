var requestActive = false, executeNow = false;
var actionUrl = 'https://midburn-queue.herokuapp.com/status';
var interval = 10000;

function queueStatus() {
    if (!requestActive) {
            requestActive = true;
            $.ajax({
            url: actionUrl,
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8'
        }).done(function(data, status, xhr) {
            window.location = data.register_page;
        }).always(function(data, status, xhr) {
            requestActive = false;
            $('#last-update').html(new Date());
            if (executeNow) {
                executeNow = false;
                queueStatus();    
            }
        });
    } else { // set to reexecute exactly when request returns
        executeNow = true;
    }
}

$(document).ready(function() {
    queueStatus();
    window.setInterval(queueStatus, interval);
});