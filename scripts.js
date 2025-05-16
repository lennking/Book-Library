const myLibrary=[];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(someBook) {
    myLibrary.push(someBook);
}

let book1 = new Book("The Hobbit", "JRR Tolkien", 320, false);
addBookToLibrary(book1);