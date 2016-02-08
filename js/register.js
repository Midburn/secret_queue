var retries = 0, actionUrl = 'https://midburn-queue.herokuapp.com/register', timeout = 10000, processing = false;

checkForm = function() {
    if ($('#name').val() != '' && $('#family').val() != '' && $('#user-email').val() != '') {
        $('#do-request').attr('disabled', false);
    } else {
        $('#do-request').attr('disabled', 'disabled');
    }
};

toggleButton = function(hide) {
    if (!processing) {
       if (hide) {
            $('#do-request').attr('disabled', 'disabled');
            $('#do-request').addClass('hide');
            $('#loading').removeClass('hide');
        } else {
            $('#do-request').attr('disabled', false);
            $('#do-request').removeClass('hide');
            $('#loading').addClass('hide');
            $('#message').html('');
        }        
    }
};

register = function() {
    processing = true;
    toggleButton(true);
    var email = $('#user-email').val();
    $.ajax({
        url: actionUrl,
        type: 'post',
        contentType: "application/json; charset=utf-8",
        timeout: timeout,
        data: JSON.stringify({ "username": email })  
    }).done(function(data, status, xhr) {
        window.location='thanks.html?email=' + email;
    }).fail(function(data, status, xhr) {
        if (retries < 5) {
            retries++;
            setTimeout(function() {
                register();
            }, 1000);
        } else if (retries < 30) {
            retries++;
            timeout = 15000;
            setTimeout(function() {
                register();
            }, 1000);
        } else {
            processing = false;
            toggleButton(false);
            $('#message').html('You are too early, or too late. You can go <a href="index.html">here</a> or retry.');
        }
        
    });
    setTimeout(function() {
        $('#loading').html('still loading...')
    }, 2000);
};

$(document).ready(function() {
    $('.field').keyup(function() {
        checkForm();
    });
    $('.field').blur(function() {
        checkForm();
    });
    $('#do-request').click(function() {
        register();
    });
});