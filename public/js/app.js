$(document).ready(function() {
  $(document).on('click', '.scrape-link', function(event) {
    event.preventDefault();
    $.ajax({
      method: 'GET',
      url: '/articles/'
    }).then(function(data) {
      console.log(data);
      $('.article-section-heading').text('ARTICLES');
      $('.article-section-heading').css('border-bottom', '3px solid black');
      $('.article-section-heading').css('padding-bottom', '5px');
      for (var i = 0; i < data.length; i++) {
        $('.article-section').append(
          "<div class='article-content'>" +
            "<div class='row'>" +
            "<div class='col-lg-9'>" +
            '<a href=' +
            data[i].link +
            " target='_blank'>" +
            '<h2>' +
            data[i].title +
            '</h2>' +
            '</a>' +
            '<br />' +
            '<p>' +
            data[i].body +
            '</p>' +
            '</div>' +
            '<div class="col-lg-3 thumbs-up">' +
            '<i class="far fa-thumbs-up thumbs-up-icon"></i>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
      }
    });
  });
});
