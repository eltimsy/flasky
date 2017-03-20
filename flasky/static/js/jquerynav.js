$(function(){
    $('#navbar a').click(function (event) {
        event.preventDefault();
        let url = $(this).attr('href');
        loadPage(url)
        $('#navbar a').css('text-decoration', 'none');
     $(this).css('text-decoration', 'underline');
     });
 });

function loadPage(url) {
  console.log(url)
  $.ajax({
    url: url,
    method: 'GET',
    success: function(response) {
      console.log(response)
    },
    error: function(request, status, error) {
      alert(request.reponseText);
    }
  });
}