'use strict';

var app = app || {};

(function(module) {
  let __API_URL__ = 'http://localhost:3000'; //dev
  //let __API_URL__ = 'https://rd-km-booklist.herokuapp.com'; //production

  function Book(dataObj){
    Object.keys(dataObj).forEach(key => {
      this[key] = dataObj[key];
    }, this);
  }


  Book.prototype.toHtml = function() {
    // console.log('this', this);
    let template  = Handlebars.compile($('#book-list-template').text());
    return template(this);
  };


  Book.all = [];

  Book.loadAll = function(rows){
    rows.sort((a,b) => b.title - a.title);
    Book.all = rows.map(book => new Book(book));
    //console.log('loadAll Book.all', Book.all);
  };

  Book.fetchAll = function (callback){
    $.get(`${__API_URL__}/api/v1/books`)
      .then(data => {
        Book.loadAll(data)
        if (callback) callback();
      })
      .catch(errorCallback);

  };

  Book.fetchOne = function (ctx, callback) {
    $.get(`${__API_URL__}/api/v1/books/${ctx.params.id}`)
      .then(data => {
        console.log('data', data);
        ctx.author = data[0].author;
        ctx.title = data[0].title;
        ctx.description = data[0].description;
        ctx.image_url = data[0].image_url;
        ctx.book_id = data[0].book_id;
        //let this_book = new Book({'author': data[0].author});
      })
      .then(() => callback(ctx))
      .catch(errorCallback)
  }

  Book.create = function(book) {

    $.post(`${__API_URL__}/api/v1/books/new`,book)
      .then(console.log('record inserted'))
      .catch(errorCallback)
  }

  function errorCallback(error) {
    console.error('this is the error message',error);
    app.errorView.initErrorPage(error);
  }
  module.Book = Book;
})(app);
