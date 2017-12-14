'use strict';
var app = app || {};
(function (module){
  let bookView = {};

  function resetView() {
    $('.container').hide();
  }

  bookView.initIndexPage = function() {
    //console.log('book.all',app.Book.all);
    resetView();
    $('#book-view').show();
    $('#book-list').empty();

    $('nav').on('click', 'li, .icon-menu', function(e){ console.log('e',e); $('#menu-list').slideToggle()} );

    app.Book.all.map(book => {
      // console.log('book', book);
      $('#book-list').append(book.toHtml())
    });
  };



  bookView.initDetailPage = function(bookObj) {
    resetView();
    $('#detail-view').show();
    $('#detail-view').empty();

    let template = Handlebars.compile($('#detail-template').text());
    $('#detail-view').append(template(bookObj));
  }

  bookView.initFormPage = function() {
    resetView();
    $('#form-view').show();
    $('#new-book-form').on('submit', function(event) {
      event.preventDefault();
      let book = {
        title: event.target.title.value,
        author: event.target.author.value,
        isbn: event.target.isbn.value,
        image_url: event.target.image_url.value,
        description: event.target.description.value,
      }
      page('/');
      app.Book.create(book);
    })
  }

  // $(document).ready(()=> {
  //   app.Book.fetchAll(bookView.initIndexPage)
  // })

  module.bookView = bookView;

})(app);
