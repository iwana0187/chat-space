$(function(){
  $('.footer__framwork__form-submit').on('submit', function(e){
    e.preventDefault();
    console.log(this)
    var formData = new FormData(this)
  })
})
