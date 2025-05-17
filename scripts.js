const myLibrary=[];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

const shelf = document.getElementById("shelf");

function appendBookToShelf(book) {
    const bookDiv = document.createElement('div');
    bookDiv.textContent = `${book.title} by ${book.author}, ${book.pages} pages, Read: ${book.read}`;
    shelf.appendChild(bookDiv);
}

function addBookToLibrary(thisBook) {
    myLibrary.push(thisBook);
    appendBookToShelf(thisBook);
}

let book1 = new Book("The Hobbit", "JRR Tolkien", 320, false);
addBookToLibrary(book1);

const form = document.getElementById('book-form');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    //get book details
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.querySelector('input[name="read"]:checked').value==='true';
    //create new book
    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);

});