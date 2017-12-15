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
    $('#detail-view').empty();

    let template = Handlebars.compile($('#detail-template').text());
    $('#detail-view').append(template(bookObj));
    $('#read-more').on('click', function(){$('#detail-descritpion').toggleClass('is-revealed')});
    if (localStorage.admin) {
      $('.admin-btns').addClass('is-visible');
    }
    $('#detail-view').show();
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
      page('/');
    })
  }

  bookView.initUpdatePage = function(ctx) {
    resetView();
    console.log('ctx body inside initupdate',ctx);
    $('#update-view').show();
    $('#update-book-form input[name="author"]').val(ctx.author);
    $('#update-book-form input[name="title"]').val(ctx.title);
    $('#update-book-form input[name="isbn"]').val(ctx.isbn);
    $('#update-book-form input[name="image_url"]').val(ctx.image_url);
    $('#update-book-form textarea').val(ctx.description);

    $('#update-book-form').on('submit', function(event) {
      event.preventDefault();
      let book = {
        title: event.target.title.value,
        author: event.target.author.value,
        isbn: event.target.isbn.value,
        image_url: event.target.image_url.value,
        description: event.target.description.value,
        book_id: ctx.book_id
      }
      app.Book.update(book);
    })
  }

  bookView.initSearchFormPage = function(callback) {
    resetView();
    $('#search-form').show();
    $('#search-form').on('submit', function(event) {
      event.preventDefault();
      let bookSearch = {
        title: event.target.author.value,
        author: event.target.author.value,
        isbn: event.target.author.value,
      }
      app.Book.find(bookSearch, callback);
    })
  }
  bookView.initSearchResultsPage = function() {
    resetView();
    $('#search-results-view').show();
    app.Book.all.map(book => {
      $('#search-result-list').append(book.toHtml())
    });
  }




  // $(document).ready(()=> {
  //   app.Book.fetchAll(bookView.initIndexPage)
  // })

  module.bookView = bookView;

})(app);
