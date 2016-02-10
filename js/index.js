var config = {
	path: 'https://midburn-queue.herokuapp.com/status',
	interval: 10000,
	sendAt: ['19:0:0', '19:0:2', '19:0:4'] // no leading zeros! (e.g. 19:0:0)
};

var send = function() {
	$.ajax({
		url: config.path,
		type: 'post',
		dataType: 'json',
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
	var time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
	if (config.sendAt.indexOf(time) > -1) {
		send();
	}
};

var init = function() {
	send();
	setInterval(checkForTime, 1000);
}();