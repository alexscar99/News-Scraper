$(document).ready(function() {
  $(document).on('click', '.scrape-link', function(event) {
    event.preventDefault();
    $.ajax({
      method: 'GET',
      url: '/articles/'
    }).then(function(data) {
      // Log the response
      console.log(data);
      $('.article-section h2').text('Articles');
      for (var i = 0; i < 20; i++) {
        $('.article-section').append(
          "<div class='article-content'>" +
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
            '</div>'
        );
      }
    });
  });

  // $.getJSON('/articles', function(data) {
  //   console.log(data);
  //   for (var i = 0; i < 20; i++) {
  //     $('article-section').append(
  //       // "<div class='article-content'>" +
  //       //   '<a href=' +
  //       //   data[i].link +
  //       //   " target='_blank'>" +
  //       //   '<h2>' +
  //       //   data[i].title +
  //       //   '</h2>' +
  //       //   '</a>' +
  //       //   '<br />' +
  //       //   '<p>' +
  //       //   data[i].body +
  //       //   '</p>' +
  //       //   '</div>'
  //       'hello'
  //     );
  //   }
  // });

  $('.scrape-btn').on('click', function(e) {});
});
