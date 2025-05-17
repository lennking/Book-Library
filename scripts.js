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
    bookDiv.innerHTML = `
        <strong>${book.title}</strong>
        <button type='button' class='remove-btn'>x</button><br>
        Author: ${book.author}<br>
        Pages: ${book.pages}<br>
        Read: ${book.read}<br>
    `;
    shelf.appendChild(bookDiv);

    //x to remove book
    const removeBtn = bookDiv.querySelector('.remove-btn');
    removeBtn.addEventListener('click', () =>{
        bookDiv.remove();
    });
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