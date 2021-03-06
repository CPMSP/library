const bookShelf = document.querySelector('.bookShelf');

const inputContainer = document.querySelector('.addBookContainer');

const demoInfo = document.querySelector('.demoInfo');
const newBookButton = document.querySelector('.submitButton');
const clearAll = document.querySelector('.clearAll');

const demoLibrary = [
	{
		title: 'It',
		author: 'Stephen King',
		pages: 1093,
		complete: true,
		commentary:
			"This book is the reason why I don't like clowns or playing near sewer grates."
	},
	{
		title: 'Books of Blood Vol 1',
		author: 'Clive Barker',
		pages: 210,
		complete: false,
		commentary:
			"My brother really liked horror novels and I think this series is supposed to be pretty good.  I'll have to read it sometime soon."
	},
	{
		title: 'Main Street',
		author: 'Sinclair Lewis',
		pages: 471,
		complete: true,
		commentary:
			"I really don't recall reading this book, but from reading the summary online I'll likely have to again in the future.  It was for school and I kept it because I remember enjoying it."
	}
];

let myLibrary = [];

function Book(title, author, pages, complete, commentary) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.complete = complete;
	this.commentary = commentary;
}

const populateBookshelf = () => {
	let library = JSON.parse(localStorage.getItem('library'));
	if (library !== null) {
		myLibrary = library;
	}
	else {
		myLibrary = demoLibrary;
	}
};

function displayBookshelf() {
	// clear bookshelf before displaying any revisions
	while (bookShelf.firstChild) {
		bookShelf.removeChild(bookShelf.firstChild);
	}
	myLibrary.forEach((book) => {
		let cover = document.createElement('div');
		cover.classList.add('bookBinding');

		let bookTitle = document.createElement('h3');
		bookTitle.textContent = book.title;

		let bookAuthor = document.createElement('h4');
		bookAuthor.textContent = `By: ${book.author}`;

		let bookPages = document.createElement('p');
		bookPages.textContent = `Pages: ${book.pages}`;

		let finishedBook = document.createElement('p');
		finishedBook.textContent = 'Completed ?';

		let bookComplete = document.createElement('input');
		bookComplete.type = 'checkbox';
		// checks checkbox if book is completed
		book.complete === true
			? (bookComplete.checked = true)
			: (bookComplete.checked = false);
		// toggles property according to checkbox and saves
		bookComplete.addEventListener('click', () => {
			book.complete = !book.complete;
			saveLibrary();
		});

		let commentaryTag = document.createElement('p');
		commentaryTag.textContent = 'Commentary:';

		let bookCommentary = document.createElement('p');
		bookCommentary.textContent = book.commentary;

		// assign id available upon display based on index in array
		book.id = myLibrary.indexOf(book);

		let deleteBook = document.createElement('button');
		deleteBook.classList.add('deleteButton');
		deleteBook.textContent = 'Delete';
		deleteBook.addEventListener('click', () => {
			// remove from DOM
			bookShelf.removeChild(cover);
			// remove from localStorage
			let localLibrary = JSON.parse(localStorage.getItem('library'));
			localLibrary.splice(book.id, 1);
			localStorage.setItem('library', JSON.stringify(localLibrary));
			// remove from array
			myLibrary.splice(book.id, 1);
		});

		bookShelf.appendChild(cover);

		cover.append(
			bookTitle,
			bookAuthor,
			bookPages,
			finishedBook,
			bookComplete,
			commentaryTag,
			bookCommentary,
			deleteBook
		);
		saveLibrary();
	});
}

function addBook(title, author, pages, complete, commentary) {
	if (!title || !author || !pages || !commentary) {
		alert('Please fill in all text fields to add a book');
	}
	else {
		let newBook = new Book(title, author, pages, complete, commentary);
		myLibrary.push(newBook);
		displayBookshelf();
	}
}

function addBookToLibrary() {
	demoInfo.classList.add('hidden');
	newBookButton.classList.add('hidden');
	clearAll.classList.add('hidden');

	let newForm = document.createElement('div');
	newForm.classList.add('inputContainer');

	let title = document.createElement('input');
	title.type = 'text';
	title.placeholder = 'title';

	let author = document.createElement('input');
	author.type = 'text';
	author.placeholder = 'author';

	let pages = document.createElement('input');
	pages.type = 'number';
	pages.placeholder = '# of pages';

	let commentary = document.createElement('input');
	commentary.type = 'textarea';
	commentary.placeholder = 'comments / notes';

	let checkboxDiv = document.createElement('div');
	checkboxDiv.classList.add('checkbox');

	let checkboxPrompt = document.createElement('p');
	checkboxPrompt.textContent = 'Check if Book is Completed';
	checkboxPrompt.classList.add('checkbox');

	let complete = document.createElement('input');
	complete.type = 'checkbox';
	complete.classList.add('checkbox');

	let submit = document.createElement('button');
	submit.type = 'submit';
	submit.textContent = 'Submit';

	inputContainer.appendChild(newForm);

	newForm.append(title, author, pages, commentary, checkboxDiv);

	checkboxDiv.append(checkboxPrompt, complete, submit);

	submit.addEventListener('click', () => {
		addBook(
			title.value,
			author.value,
			pages.value,
			complete.checked,
			commentary.value
		);
		newBookButton.classList.remove('hidden');
		demoInfo.classList.remove('hidden');
		clearAll.classList.remove('hidden');
		inputContainer.removeChild(newForm);
	});
	saveLibrary();
	displayBookshelf();
}

const saveLibrary = () => {
	localStorage.setItem('library', JSON.stringify(myLibrary));
};

newBookButton.addEventListener('click', addBookToLibrary);

demoInfo.addEventListener('click', () => {
	myLibrary = demoLibrary;
	displayBookshelf();
});

clearAll.addEventListener('click', () => {
	myLibrary = [];
	displayBookshelf();
});

populateBookshelf();
displayBookshelf();
