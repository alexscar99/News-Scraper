$(document).on('click', '#article-comment', function() {
  $('#comments').empty();
  var thisId = $(this).attr('data-id');

  $.ajax({
    method: 'GET',
    url: '/articles/' + thisId
  }).then(function(data) {
    console.log(data);

    $('#comments').append("<h2 id='comment-title'>" + data.title + '</h2>');
    $('#comments').append("<input id='input-title' name='title'><br><br>");
    $('#comments').append(
      "<textarea id='input-body' name='body'></textarea><br><br>"
    );
    $('#comments').append(
      "<button data-id='" + data._id + "' id='save-comment'>Save Note</button>"
    );

    if (data.comment) {
      $('#input-title').val(data.comment.title);
      $('#input-body').val(data.comment.body);
    }
  });
});

$(document).on('click', '#save-article', function() {
  let thisId = $(this).attr('data-id');
  let favorited = $(this).attr('data-favorited');

  if (favorited === 'false') {
    $.ajax({
      method: 'PUT',
      url: '/articles/' + thisId,
      data: {
        favorited: true
      }
    }).then(function(data) {
      console.log(data);
    });
  }
});

$(document).on('click', '#delete', function() {
  let thisId = $(this).attr('data-id');
  let favorited = $(this).attr('data-favorited');

  if (favorited === 'true') {
    $.ajax({
      method: 'PUT',
      url: '/articles/' + thisId,
      data: {
        favorited: false
      }
    }).then(function(data) {
      console.log(data);
    });
  }
});

$(document).on('click', '#save-comment', function() {
  var thisId = $(this).attr('data-id');

  $.ajax({
    method: 'POST',
    url: '/articles/' + thisId,
    data: {
      title: $('#input-title').val(),
      body: $('#input-body').val()
    }
  }).then(function(data) {
    console.log(data);
    $('#comments').empty();
  });

  $('#input-title').val('');
  $('#input-body').val('');
});
