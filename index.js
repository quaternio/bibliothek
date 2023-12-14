const myLibrary = [];

function Book(title, author, pages, haveRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
}

function addBookToLibrary(title, author, pages, haveRead) {
  myLibrary.push(new Book(title, author, pages, haveRead)); 
}

function displayLibrary() {
  myLibrary.forEach((book) => console.log(book));
}

for (let i = 0; i < 10; i++) {
  addBookToLibrary(`Book ${i}`, 'the guy', 1000000, true);
}

displayLibrary();
