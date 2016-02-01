$(function() {
    //hang on event of form with id=myform
    $("#queue-form").submit(function(e) {

        //prevent Default functionality
        e.preventDefault();

        //get the action-url of the form
        var actionurl = "https://midburn-queue.herokuapp.com/enqueue";
        var email = $('#user-email').val()
        //do your own request an handle the results
        $.ajax({
          url: actionurl,
          type: 'post',
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify({ "email": email }),
          success: function(response) {
            window.location='thanks.html?email='+email
          },
          error: function(response) {
            if (response.status == 403) {
              alert("The queue is not open yet. Please wait for 7:00pm (Israel time) for the queue to be opened.");
            };
            if (response.status == 500) {
              alert("Opps. Server error. We are following all errors and probably handling it at this moment. Hang tight.")
            };
          }
        });
    });
});
