const myLibrary = [];
const body = document.querySelector("#body");
const dialog = document.querySelector("dialog");
const addButton = document.getElementById("add-book"); 
const submitBook = document.getElementById("submit-book");
const bookForm = document.getElementById("book-form");
const cancelButton = document.getElementById("cancel-button");

function Book(title, author, pages, haveRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;

  this.isEqual = (other) => {
    let sameTitle = this.title === other.title;
    let sameAuthor = this.author === other.author;
    let samePages = this.pages === other.pages;

    return sameTitle && sameAuthor && samePages;
  }
}

function registerButtons(statusButton, deleteButton, book) {
  registerStatusButton(statusButton, book); 
  registerDeleteButton(deleteButton, book);
}

function registerStatusButton(button, book) {
  button.addEventListener("click", (e) => {
    book.haveRead = book.haveRead === "Read" ? "Not Read" : "Read";

    button.innerText = book.haveRead;
  });
}

function registerDeleteButton(button, book) {
  button.addEventListener("click", (e) => {
    let bookIdx;
    for (let i = 0; i < myLibrary.length; i++) {
      if (book.isEqual(myLibrary[i])) {
        bookIdx = i;
        break;
      }
    }
    myLibrary.splice(bookIdx, 1);

    resetLibrary();
    displayLibrary();
  }); 
}

let lastAdded = null;
// Assumes that book is already in myLibrary
function addBookTile(book) {
  let bookTile = document.createElement("div");
  bookTile.classList.add("tile");
  
  // Remove the margin under last added
  if (lastAdded)
    lastAdded.style.marginBottom = "0px";

  // Style the newest addition
  bookTile.style.marginBottom = "15px";

  let titleEntry = document.createElement("p");
  titleEntry.classList.add("tile-entry");
  titleEntry.innerText = book.title;

  let authorEntry = document.createElement("p");
  authorEntry.classList.add("tile-entry");
  authorEntry.innerText = book.author;

  let pagesEntry = document.createElement("p");
  pagesEntry.classList.add("tile-entry");
  pagesEntry.innerText = book.pages;
  
  let haveReadEntry = document.createElement("p");
  haveReadEntry.classList.add("tile-entry"); 
  haveReadEntry.classList.add("status-button-container");
  let statusToggle = document.createElement("button");
  statusToggle.classList.add("status-toggle");
  statusToggle.innerText = book.haveRead;
  haveReadEntry.appendChild(statusToggle);
  // Does this have to depend on delete button?
  
  let deleteButton = document.createElement("button"); 
  deleteButton.classList.add("book-button");

  let minus = document.createElement("img");
  minus.src = "assets/minus-box-outline.svg";
  minus.classList.add("minus-sign");
  deleteButton.appendChild(minus);

  registerButtons(statusToggle, deleteButton, book);

  bookTile.appendChild(titleEntry);
  bookTile.appendChild(authorEntry);
  bookTile.appendChild(pagesEntry);
  bookTile.appendChild(haveReadEntry);
  bookTile.appendChild(deleteButton);

  body.appendChild(bookTile); 

  lastAdded = bookTile;
}

function displayLibrary() {
  lastAdded = null;
  myLibrary.forEach((book) => {
    addBookTile(book);
  });
}

function resetLibrary() {
  console.log(body.childElementCount);
  while (body.childElementCount != 1) {
    body.removeChild(body.lastChild);
  }
}

function addBookToLibrary(title, author, pages, haveRead) {
  myLibrary.push(new Book(title, author, pages, haveRead));
  
  resetLibrary();
  displayLibrary();
}



/************
 * Main Code
 ************/
addButton.addEventListener("click", () => {
  dialog.showModal(); 
});

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  let author = document.getElementById("bf-author");
  let title = document.getElementById("bf-title");
  let pages = document.getElementById("bf-pages");
  let haveRead = document.getElementById("bf-status");

  console.log(haveRead.value);

  if (!title.value || !author.value || !pages.value)
    alert("Invalid Entry");

  addBookToLibrary(title.value, author.value, pages.value, haveRead.value);

  bookForm.reset();
  dialog.close();
});

cancelButton.addEventListener("click", () => {
  bookForm.reset();
  dialog.close();
});

// for (let i = 0; i < 100; i++) {
//   addBookToLibrary(`Book ${i}`, 'the guy', Math.floor(1000000*Math.random()), "Not Read");
// }

