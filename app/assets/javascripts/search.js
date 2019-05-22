$(function(){
  var search_list = $("#user-search-result");
  function appendUser(user){
    var html =`<div class="chat-group-user clearfix">
                 <p class="chat-group-user__name">${user.name}</p>
                 <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加
                 </div>
               </div>`
    search_list.append(html);
  }


  $(document).on('click',".chat-group-user__btn--add", function(){
    addUser(this)
    $(this).parent().remove()
  })

  var group_user_list = $(".chat-group-form__field--right--box")

  function addUser(user){
    var html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <p class="chat-group-user__name">${user.dataset.userName}</p>
                <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${user.dataset.userId}" data-user-name="${user.dataset.userName}">削除
                </div>
               </div>`
    group_user_list.append(html);
  }

  $(".js-remove-btn").on('click', function(){
    $("#chat-group-user-8").remove();
  })

  function appendErrMsgToHTML(msg){
    var html = `<p class="chat-group-user">${msg}</p>`
  }

  $(".chat-group-form__input").on("keyup", function(){
    var input = $(".chat-group-form__input").val();
    $.ajax({
      Type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(users){
      $(" #user-search-result").empty();
      if(users.length !== 0){
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーが存在しません。");
      }
    })

    .fail(function() {
      alert('ユーザー検索に失敗しました。');
    })
  });
});
