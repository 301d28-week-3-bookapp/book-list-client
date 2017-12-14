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

    $('nav').on('click', 'li, .icon-menu', function(){ $('#menu-list').slideToggle()} );
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
    $('#read-more').on('click', function(){$('#detail-descritpion').toggleClass('is-revealed')});
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
      app.Book.create(book);
    })
  }

  bookView.initUpdatePage = function(ctx) {
    resetView();
    $('#update-view').show();
    $('#update-book-form input[name="author"]').val(ctx.body.author);
    $('#update-book-form input[name="title"]').val(ctx.body.title);
    $('#update-book-form input[name="isbn"]').val(ctx.body.isbn);
    $('#update-book-form input[name="image_url"]').val(ctx.body.image_url);
    $('#update-book-form textarea').val(ctx.body.description);

    $('#update-book-form').on('submit', function(event) {
      event.preventDefault();
      let book = {
        title: event.target.title.value,
        author: event.target.author.value,
        isbn: event.target.isbn.value,
        image_url: event.target.image_url.value,
        description: event.target.description.value,
      }
      app.Book.update(book);
    })
  }


  // $(document).ready(()=> {
  //   app.Book.fetchAll(bookView.initIndexPage)
  // })

  module.bookView = bookView;

})(app);
