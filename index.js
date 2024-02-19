const body = document.querySelector("#body");
const dialog = document.querySelector("dialog");
const addButton = document.getElementById("add-book"); 
const submitBook = document.getElementById("submit-book");
const bookForm = document.getElementById("book-form");
const cancelButton = document.getElementById("cancel-button");

class Book {
  constructor(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
  }

  isEqual(other) {
    let sameTitle = this.title === other.title;
    let sameAuthor = this.author === other.author;
    let samePages = this.pages === other.pages;

    return sameTitle && sameAuthor && samePages;
  }
}

class Library {
  #library = [];

  constructor() {
    this.lastAdded = null;
  }

  addBookTile(book) {
    let bookTile = document.createElement("div");
    bookTile.classList.add("tile");
    
    // Remove the margin under last added
    if (this.lastAdded)
      this.lastAdded.style.marginBottom = "0px";

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

    this.registerButtons(statusToggle, deleteButton, book);

    bookTile.appendChild(titleEntry);
    bookTile.appendChild(authorEntry);
    bookTile.appendChild(pagesEntry);
    bookTile.appendChild(haveReadEntry);
    bookTile.appendChild(deleteButton);

    body.appendChild(bookTile); 

    this.lastAdded = bookTile;
  }

  bookInLibrary(title, author, pages) {
    let bookPresent = false;
    let sameTitle = false;
    let sameAuthor = false;
    let samePages = false;
    this.#library.forEach((book) => {
      if (!bookPresent) {
        sameTitle = title === book.title;
        sameAuthor = author === book.author;
        samePages = pages === book.pages;

        if (sameTitle && sameAuthor && samePages) {
          bookPresent = true;
          alert("That book is already in your library.");
        }
      }
    });

    return bookPresent;
  }

  displayLibrary() {
    this.lastAdded = null;
    this.#library.forEach((book) => {
      this.addBookTile(book);
    });
  }

  resetLibrary() {
    while (body.childElementCount != 1) {
      body.removeChild(body.lastChild);
    }
  }

  addBook(title, author, pages, haveRead) {
    if (!this.bookInLibrary(title, author, pages, haveRead)) {
      this.#library.push(new Book(title, author, pages, haveRead));
      this.resetLibrary();
      this.displayLibrary();
    }
  }

  registerButtons(statusButton, deleteButton, book) {
    this.registerStatusButton(statusButton, book); 
    this.registerDeleteButton(deleteButton, book);
  }

  registerStatusButton(button, book) {
    button.addEventListener("click", (e) => {
      book.haveRead = book.haveRead === "Read" ? "Not Read" : "Read";

      button.innerText = book.haveRead;
    });
  }

  registerDeleteButton(button, book) {
    button.addEventListener("click", (e) => {
      let bookIdx;
      for (let i = 0; i < this.#library.length; i++) {
        if (book.isEqual(this.#library[i])) {
          bookIdx = i;
          break;
        }
      }
      this.#library.splice(bookIdx, 1);

      this.resetLibrary();
      this.displayLibrary();
    }); 
  }
}


/************
 * Main Code
 ************/
let main = (() => {
  library = new Library();

  addButton.addEventListener("click", () => {
    dialog.showModal(); 
  });
  
  bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let author = document.getElementById("bf-author");
    let title = document.getElementById("bf-title");
    let pages = document.getElementById("bf-pages");
    let haveRead = document.getElementById("bf-status");
  
    if (!title.value || !author.value || !pages.value)
      alert("Invalid Entry");
  
    library.addBook(title.value, author.value, pages.value, haveRead.value);
  
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
})();

