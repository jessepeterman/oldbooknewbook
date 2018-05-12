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
      return JSON.parse(localStorage.getItem('books'));
    },
    getBooksFromStorage(){
      let books;
      if(localStorage.getItem('books') === null){
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
        return books;
    },
    // Setup local storage
    storeItem(book){
      let books;

      if(localStorage.getItem('books') === null){
      books = [];

      books.push(book);

      // Set LocalStorage
      localStorage.setItem('books', JSON.stringify(books));
      } else {

      books = JSON.parse(localStorage.getItem('books'));

      // push new item
      books.push(book);

      localStorage.setItem('books', JSON.stringify(books));
      }

    }

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
  // books: StorageCtrl.getBooksFromStorage();
  // books: sampleData,
  books: StorageCtrl.getBooksFromStorage(),
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
    getOldBooks(books){
      //make temporary array for books is older than or equal to 50 years ago
      const oldBooks = books.filter(book => book.year < '1968');
      return oldBooks;
    },
    getNewBooks(books){
      //make temporary array for books is older than or equal to 50 years ago
      const newBooks = books.filter(book => book.year > '1968');
      return newBooks;
    },
    generateRandomBook(books){
      // Generate random ID ** make sure to use temporary array length
      const randomID = Math.floor(Math.random()*books.length);
      // find random ID and return single book
      // function isId(book){
      //   return book.id === randomID;
      // }
      // const randomBook = books.find(isId);

      const randomBook = books.filter((book, index)=>{
        return book.index === randomID;
      });

      // instead of searching by ID of new array, search by index?
      console.log(randomBook);
      return randomBook;
    },
    convertArrayOfObjectsToCSV(args) {
          var result, ctr, keys, columnDelimiter, lineDelimiter, data;

          data = args.data || null;
          if (data == null || !data.length) {
              return null;
          }

          columnDelimiter = args.columnDelimiter || ',';
          lineDelimiter = args.lineDelimiter || '\n';

          keys = Object.keys(data[0]);

          result = '';
          result += keys.join(columnDelimiter);
          result += lineDelimiter;

          data.forEach(function(item) {
              ctr = 0;
              keys.forEach(function(key) {
                  if (ctr > 0) result += columnDelimiter;

                  result += item[key];
                  ctr++;
              });
              result += lineDelimiter;
          });

          return result;
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
    generateBookBtn: '.generate-book-btn',
    bookList: '.book-list',
    showListBtn: '.show-list-btn',
    hideListBtn: '.hide-list-btn',
    randomBookDisplay: '.book-recommendation-container',
    oldBookDisplay: '#old-book-title',
    oldBookBodyDisplay: '.old-book-body',
    newBookDisplay: '#new-book-title',
    newBookBodyDisplay: '.new-book-body',
    exportCSVBtn: '.export-csv'
  };

  return {
    populateBookList: function(books){
      let html = '';

      if(books !== null){
      books.forEach(function(book){
        html += `<li class="list-group-item mb-3">
        <strong>Book:</strong> ${book.title}<br>
        <strong>Author:</strong> ${book.author}<br>
        <em>Year: ${book.year},
        Pages: ${book.pages}</em>
        </li>
        `;
      });

      document.querySelector(UISelectors.bookList).innerHTML = html;
    }
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
      <li class="list-group-item mb-3">
      <strong>Book:</strong> ${book.title}<br>
      <strong>Author:</strong> ${book.author}<br>
      <em>Year: ${book.year},
      Pages: ${book.pages}</em>
      </li>
      `;

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
    showRandomBooks(){
      document.querySelector(UISelectors.randomBookDisplay).style.display = 'inline-grid';
    },
    hideRandomBooks(){
      document.querySelector(UISelectors.randomBookDisplay).style.display = 'none';
    },
    displayOldBookRecommendation(book){
      // document.querySelector(UISelectors.oldBookDisplay).textContent = book.title;
      UICtrl.showRandomBooks();
      const p = document.createElement('p');

      p.innerHTML = `
      <p><strong>${book.title}</strong><br>${book.author}<br>
      <em>Year: ${book.year},
      Pages: ${book.pages}</em>
      </p>
      `;

      document.querySelector(UISelectors.oldBookBodyDisplay).innerHTML = p.innerHTML
    },
    displayNewBookRecommendation(book){
      // document.querySelector(UISelectors.oldBookDisplay).textContent = book.title;
      UICtrl.showRandomBooks();
      const p = document.createElement('p');

      p.innerHTML = `
      <p><strong>${book.title}</strong><br>${book.author}<br>
      <em>Year: ${book.year},
      Pages: ${book.pages}</em>
      </p>
      `;

      document.querySelector(UISelectors.newBookBodyDisplay).innerHTML = p.innerHTML;
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
    UICtrl.hideRandomBooks();
    // add book submit button
    document.querySelector(UISelectors.addBookBtn).addEventListener('click', addBookSubmit);

    // listen for show list button
    document.querySelector(UISelectors.showListBtn).addEventListener('click', showList);

    // listen for hide list button
    document.querySelector(UISelectors.hideListBtn).addEventListener('click', hideList);

    // book generate old and new button
    document.querySelector(UISelectors.generateBookBtn).addEventListener('click', generateBook);

    // Export list button(csv)
    // Thanks to Chris Grimes for this great looking CSV export code: https://halistechnology.com/2015/05/28/use-javascript-to-export-your-data-as-csv/
    document.querySelector(UISelectors.exportCSVBtn).addEventListener('click', downloadCSV);

    // features to implement

    // add confirm before generating new book "Did you read your last old book first?"

    // Save old and new book in local storage to remind you before generating new one


  }

  const addBookSubmit = function(e){
    // Get input from UI form
    const input = UICtrl.getBookInput();

    if(input.title !== '' && input.author !== '' && input.year !== '' && input.pages !== ''){

      // Create new book in book controller and assign to local variable
      const newBook = BookCtrl.addBook(input.title, input.author, input.year, input.pages);

      // Add book to UI by sending local variable
      UICtrl.addListBook(newBook);
      // Store in local storage or DB by sending local variable
      StorageCtrl.storeItem(newBook);

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

  const generateBook = function(){
    const books = StorageCtrl.getBooksFromStorage();
    // store array of books 50 years old, send that array to generate old book
    const oldBooks = BookCtrl.getOldBooks(books);
    const randomOldBook = BookCtrl.generateRandomBook(oldBooks);
    UICtrl.displayOldBookRecommendation(randomOldBook);

    // const newBooks = BookCtrl.getNewBooks(books);
    // const randomNewBook = BookCtrl.generateRandomNewBook(newBooks);
    // UICtrl.displayNewBookRecommendation(randomNewBook);
// closure issue?
    // const newBooks = BookCtrl.getNewBooks(books);
    // const randomNewBook = BookCtrl.generateRandomBook(newBooks);

  }

const generateNewBook = function(){
  const books = StorageCtrl.getBooksFromStorage();
  const newBooks = BookCtrl.getNewBooks(books);
  const randomNewBook = BookCtrl.generateRandomBook(newBooks);
  UICtrl.displayNewBookRecommendation(randomNewBook);
}

    downloadCSV = function(args) {
        var data, filename, link;

        const books = StorageCtrl.getBooksFromStorage();

        var csv = BookCtrl.convertArrayOfObjectsToCSV({
            data: books
        });
        if (csv == null) return;

        filename = args.filename || 'book-export.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
    }

  return {
    init: function (){

      console.log('App is running!');

      // console.log(StorageCtrl.getBooks());
      // const books = StorageCtrl.getBooks();
      const books = StorageCtrl.getBooks();

      UICtrl.populateBookList(books);

      loadEventListeners();

    }
  }
})(BookCtrl, StorageCtrl, UICtrl);

App.init();
