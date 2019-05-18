$(function(){
  $('.footer__framwork__form-submit').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this)
  })
})
