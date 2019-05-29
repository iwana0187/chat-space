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
      console.log(data)
      var html = buildHTML(data);
      $(".main").append(html)
      $(".footer__framwork__input-box__form-message").val('')
      $(".footer__framwork__form-submit").prop('disabled', false);
    })
    .fail(function(){
      alert('error');
    })
  })

  // $('document').ready(function(){
  //   $(".main").animate({scrollTop:$('.footer__framwork')}, 500, 'swing');
  // })

  var reloadMessages = function(message) {
    last_message_id = $("#blog")
    group_id = $(".main-contents__header__block__group-name").data('group_id')
    var url = `/groups/${group_id}/api/messages`
    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id},
      processData: false,
      contentType: false
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML += buildHTML(message);
      })
      $('.main').append(insertHTML)
    })
    .fail(function() {
      console.log('error');
    });
  };
  setInterval(reloadMessages, 5000);
  $('html,body').animate({scrollTop: 0}, 500, 'swing');
});
