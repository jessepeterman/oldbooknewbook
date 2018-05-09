const StorageCtrl = (function (){

  let bookList = [
    {
      book: 'mere',
      author: 'Lewis',
      year: 1938,
      pages: 205
    },
    {
      book: 'preaching',
      author: 'stott',
      year: 1985,
      pages: 350
    }
    ];

  return {
    getBooks(){
      return bookList;
    },

  }
})();

const BookCtrl = (function(){

sampleData = [
  {
    book: 'mere',
    author: 'Lewis',
    year: 1938,
    pages: 205
  },
  {
    book: 'preaching',
    author: 'stott',
    year: 1985,
    pages: 350
  }
];

// create class for books
const Book = function(id, title, author, year, pages){
  this.id = id;
  this.title = title;
  this.author = author;
  this.year = year;
  this.pages = pages;
}

const data = {
  // books: StorageCtrl.getItemsFromStorage();
  books: sampleData,
  currentItem: null,
  totalBooks: null
}

  return {
    getBooks(){
      return data.books;
    },
    addBook(title, author, year, pages){
      // Create id based on length of book array
      let ID;

      if(data.books.length > 0){
        ID = data.books[data.books.length-1].id+1;
      }else {
        ID = 0;
      }
      // create new instance of book class with current book input
      newBook = new Book(ID, title, author, year, pages);
      // push newly created book to array
      data.books.push(newBook);

      return newBook;
    },
    logData(){
      return data.books;
    }

  }
})();
const UICtrl = (function(){

  const UISelectors = {
    titleInput: '#title-input',
    authorInput: '#author-input',
    yearInput: '#year-input',
    pagesInput: '#pages-input',
    addBookBtn: '.add-book-btn',
    generateBookBtn: '.generateBookBtn',
    bookList: '.book-list',
    showListBtn: '.show-list-btn',
    hideListBtn: '.hide-list-btn'
  };

  return {
    populateBookList: function(books){
      let html = '';

      books.forEach(function(book){
        html += `<li class="list-group-item">
        <strong>Book:</strong> ${book.title}<br>
        <strong>Author:</strong> ${book.author}<br>
        <em>Year: ${book.year},
        Pages: ${book.pages}</em>
        </li>
        `;
      });

      document.querySelector(UISelectors.bookList).innerHTML = html;

    },
    getBookInput: function(){
      return {
          title: document.querySelector(UISelectors.titleInput).value,
          author: document.querySelector(UISelectors.authorInput).value,
          year: document.querySelector(UISelectors.yearInput).value,
          pages: document.querySelector(UISelectors.pagesInput).value
        }
    },
    addListBook: function(book){
      // show list
      document.querySelector(UISelectors.bookList).style.display = 'block';

      const li = document.createElement('li');
      li.id = `item-${book.id}`;

      li.innerHTML = `
      <li class="list-group-item">
      <strong>Book:</strong> ${book.title}<br>
      <strong>Author:</strong> ${book.author}<br>
      <em>Year: ${book.year},
      Pages: ${book.pages}</em>
      </li>
      `;
      console.log(li.innerHTML);
      document.querySelector(UISelectors.bookList).insertAdjacentElement('beforeend', li);
    },
    clearInput(){
      document.querySelector(UISelectors.titleInput).value = '';
      document.querySelector(UISelectors.authorInput).value = '';
      document.querySelector(UISelectors.yearInput).value = '';
      document.querySelector(UISelectors.pagesInput).value = '';
    },
    showListState(){
      document.querySelector(UISelectors.bookList).style.display = 'block';
      document.querySelector(UISelectors.hideListBtn).style.display = 'inline-block';
      document.querySelector(UISelectors.showListBtn).style.display = 'none';
    },
    hideListState(){
      document.querySelector(UISelectors.bookList).style.display = 'none';
      document.querySelector(UISelectors.hideListBtn).style.display = 'none';
      document.querySelector(UISelectors.showListBtn).style.display = 'inline-block';
    },
    getSelectors: function(){
      return UISelectors;
    }
  }
})();

const App = (function(BookCtrl, StorageCtrl, UICtrl){

  const loadEventListeners = function(){

    const UISelectors = UICtrl.getSelectors();

    UICtrl.hideListState();
    // add book submit button
    document.querySelector(UISelectors.addBookBtn).addEventListener('click', addBookSubmit);

    document.querySelector(UISelectors.showListBtn).addEventListener('click', showList);
    document.querySelector(UISelectors.hideListBtn).addEventListener('click', hideList);


    // book generate button

    // Show/Hide list toggle button

    // Export list button(csv)?


  }

  const addBookSubmit = function(e){
    // Get input from UI form
    const input = UICtrl.getBookInput();

    if(input.title !== '' && input.author !== '' && input.year !== '' && input.pages !== ''){

      // Create new book in book controller and assign to local variable
      const newBook = BookCtrl.addBook(input.title, input.author, input.year, input.pages);

      console.log(newBook);
      // Add book to UI by sending local variable
      UICtrl.addListBook(newBook);
      // Store in local storage or DB by sending local variable

      UICtrl.showListState();
      // Clear input fields
      UICtrl.clearInput();
    }
    e.preventDefault();
  };

  const showList = function(){

    UICtrl.showListState();
  };

  const hideList = function(){
    UICtrl.hideListState();
  };

  return {
    init: function (){

      console.log('App is running!');

      // console.log(StorageCtrl.getBooks());
      // const books = StorageCtrl.getBooks();
      const books = BookCtrl.getBooks();

      console.log(books);

      UICtrl.populateBookList(books);

      loadEventListeners();

    }
  }
})(BookCtrl, StorageCtrl, UICtrl);

App.init();
