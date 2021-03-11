const bookShelf = document.querySelector('.bookShelf');

const input = document.querySelector('.addBookContainer');
const bookSubmit = document.querySelector('.addButton');

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
	displayBookshelf();
	console.log(newBook);
}

function displayBookshelf() {
	while (bookShelf.firstChild) {
		bookShelf.removeChild(bookShelf.firstChild);
	}
	myLibrary.forEach((book) => {
		let cover = document.createElement('div');
		cover.classList.add('bookBinding');
		cover.textContent = book.title;
		bookShelf.appendChild(cover);
	});
}

function submitBook() {
	bookSubmit.classList.add('hidden');

	let newForm = document.createElement('div');
	newForm.classList.add('input');

	let title = document.createElement('input');
	title.type = 'text';
	title.placeholder = 'title';

	let author = document.createElement('input');
	author.type = 'text';
	author.placeholder = 'author';

	let pages = document.createElement('input');
	pages.type = 'number';
	pages.placeholder = '# of pages';

	let checkboxDiv = document.createElement('div');
	checkboxDiv.classList.add('checkbox');

	let checkboxPrompt = document.createElement('p');
	checkboxPrompt.classList.add('checkbox');

	let complete = document.createElement('input');
	complete.type = 'checkbox';
	complete.classList.add('checkbox');

	let submit = document.createElement('button');
	submit.type = 'submit';
	submit.textContent = 'Submit';

	input.appendChild(newForm);

	newForm.appendChild(title);
	newForm.appendChild(author);
	newForm.appendChild(pages);
	newForm.appendChild(checkboxDiv);

	checkboxDiv.appendChild(checkboxPrompt);
	checkboxDiv.appendChild(complete);
	checkboxDiv.appendChild(submit);

	submit.addEventListener('click', () => {
		addBook(title.value, author.value, pages.value, complete.value);
		bookSubmit.classList.remove('hidden');
		input.removeChild(newForm);
	});
}

bookSubmit.addEventListener('click', submitBook);

displayBookshelf();
