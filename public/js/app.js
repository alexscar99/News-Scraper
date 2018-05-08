$.getJSON('/articles', function(data) {
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
        '<h2 id="article-title">' +
        data[i].title +
        '</h2>' +
        '</a>' +
        '<br />' +
        '<p>' +
        data[i].body +
        '</p>' +
        '</div>' +
        '<div class="col-lg-3 thumbs-up" data-id="' +
        data[i]._id +
        '">' +
        '<i class="far fa-thumbs-up thumbs-up-icon"></i>' +
        '</div>' +
        '</div>' +
        '</div>'
    );
  }
});

$(document).on('click', '.thumbs-up', function(event) {
  let thisId = $(this).attr('data-id');
  $.ajax({
    method: 'GET',
    URL: '/articles' + thisId,
    data: {
      title: $('#article-title').val(),
      id: thisId
    }
  }).then(function(data) {
    console.log(data);
    $('.article-section').append(
      "<div class='article-content'>" +
        "<div class='row'>" +
        "<div class='col-lg-8>" +
        '<h2>' +
        data.title +
        '</h2>' +
        '<br />' +
        '<textarea id="comment-text"></textarea>' +
        '</div>' +
        '<div class="col-lg-2">' +
        '<button data-id="' +
        data.id +
        '" id="save-comment">Comment</button>' +
        '</div>' +
        '<div class="col-lg-2">' +
        '<button data-id="' +
        data.id +
        '" id="save-comment">Delete Article</button>' +
        '</div>' +
        '</div>' +
        '</div>'
    );
    if (data.comment) {
      $('');
    }
  });
});
