// const bookTitle = document.querySelector('#title');
// const bookAuthor = document.querySelector('#author');
// const bookPages = document.querySelector('#pages');
// const complete = document.querySelector('#complete');

// const submitBook = document.querySelector('#bookSubmit');

const bookShelf = document.querySelector('.bookShelf');

const myLibrary = [
	{
		title: 'It',
		author: 'Stephen King',
		pages: 1093,
		complete: true,
		id: 0
	},
	{
		title: 'Books of Blood Vol 1',
		author: 'Clive Barker',
		pages: 210,
		complete: false,
		id: 1
	},
	{
		title: 'Main Street',
		author: 'Sinclair Lewis',
		pages: 471,
		complete: true,
		id: 2
	}
];

function Book(title, author, pages, complete) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.complete = complete;
}

function addBook(title, author, pages, complete) {
	let newBook = new Book(title, author, pages, complete);
	myLibrary.push(newBook);
	console.log(newBook);
}

function displayBookshelf() {
	myLibrary.forEach((book) => {
		let cover = document.createElement('div');
		cover.classList.add('bookBinding');
		cover.textContent = book.title;
		bookShelf.appendChild(cover);
	});
}

// submitBook.addEventListener('click', () => {
// 	addBook(bookTitle.value, bookAuthor.value, bookPages.value, complete.value);
// 	displayBookshelf();
// });

displayBookshelf();
