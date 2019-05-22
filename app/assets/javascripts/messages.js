$(function(){
  $('.footer__framwork__form-submit').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this)
  })

  function buildHTML(message){
    if (message.image.present){
      var html = `<img src= ${message.image} >`
      return html;
    }
    else {
      var html = `<div class="main-block">
                    <ul class="main-block__user-name">
                      <%= message.user.name %>
                      <li class="main-block__user-name__time">
                        <%= message.created_at.strftime("%Y/%m/%d %H:%M") %>
                      </li>
                    </ul>
                    <div class="main-block__comments">
                      <% if message.content.present? %>
                        <p>
                          ${message.content}
                        </p>
                      <%= image_tag message.image.url  if message.image.present? %>`
      return html;
    }
  }

  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);

    var url = $(this).attr('action')

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      console.log(html)
      $('.textbox').val('')
    })
    .fail(function(){
      alert('error');
    })
  })
  $('html,body').animate({scrollTop: 0}, 500, 'swing');
});
