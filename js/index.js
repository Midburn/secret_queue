var config = {
	path: 'http://queue-api.midburn.org/status',
	interval: 10000,
	sendAt: ['17:0:0', '17:0:2', '17:0:4'] // no leading zeros! (e.g. 19:0:0) + we're using UTC time
};

var send = function() {
	$.ajax({
		url: config.path,
		type: 'post',
		dataType: 'json',
        timeout: config.interval,
		contentType: 'application/json; charset=utf-8'
	}).done(success).fail(error);
};

var success = function(data) {
	window.location = data.register_page;
};

var error = function(jqXHR, textStatus) {
	ga('send', 'event', 'index', 'responseError', 'status', textStatus);
	setTimeout(send, config.interval);
};

var checkForTime = function() {
	var date = new Date();
	var time = date.getUTCHours() + ':' + date.getUTCMinutes() + ':' + date.getUTCSeconds();
	if (config.sendAt.indexOf(time) > -1) {
		send();
	}
};

var init = function() {
	send();
	setInterval(checkForTime, 1000);
}();