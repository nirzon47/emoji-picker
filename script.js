// DOM elements
const tbody = document.getElementById('tbody')
const input = document.getElementById('search')
const category = document.getElementById('category')
const copyBtn = document.getElementsByClassName('copy')
const themeToggle = document.getElementById('theme')

const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches
	? 'dark'
	: 'light'
const theme = localStorage.getItem('theme') || prefers

if (theme === 'light') {
	theme.checked = true
	document.documentElement.setAttribute('data-theme', 'light')
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
	renderRows()
})

input.addEventListener('input', (e) => {
	renderRows(e.target.value, category.value)
})

category.addEventListener('change', (e) => {
	renderRows(input.value, e.target.value)
})

const addClickEvent = () => {
	Array.from(copyBtn).forEach((btn) => {
		btn.addEventListener('click', (e) => {
			copy(e.target.parentElement.parentElement.children[0].innerText)
		})
	})
}

themeToggle.addEventListener('click', () => {
	changeTheme()
})

// Functions
const renderRows = (query = '', category = 'Smileys & Emotion') => {
	const fragment = document.createDocumentFragment()

	emojiList.forEach((emoji) => {
		const alias = getAlias(emoji)
		const description = getDescription(emoji)
		query = query.toLowerCase()

		if (category !== 'All' && category !== emoji.category) {
			return
		}

		if (
			alias.toLowerCase().includes(query) ||
			description.toLowerCase().includes(query)
		) {
			const row = document.createElement('tr')
			row.innerHTML = `
							<td>
								<span class="w-12 inline-block">${emoji.emoji}</span>
								<div class="tooltip" data-tip="Copy">
									<button class="btn btn-primary btn-sm copy">
										<i class="fa-solid fa-clipboard"></i>
									</button>
								</div>
							</td>
							<td class="capitalize">${alias}</td>
							<td>${description}</td>
							`
			fragment.appendChild(row)
		}
	})

	tbody.innerHTML = ''
	tbody.appendChild(fragment)
	addClickEvent()
}

const getAlias = (emoji) => {
	const alias = emoji.aliases
		.toString()
		.replaceAll('_', ' ')
		.replaceAll(',', ', ')

	return alias
}

const getDescription = (emoji) => {
	const description =
		emoji.description.charAt(0).toUpperCase() + emoji.description.slice(1)

	return description
}

const copy = (emoji) => {
	navigator.clipboard.writeText(emoji)
}

const changeTheme = () => {
	const html = document.documentElement.getAttribute('data-theme')

	if (html === 'light') {
		document.documentElement.setAttribute('data-theme', 'dark')
		localStorage.setItem('theme', 'dark')
	} else {
		document.documentElement.setAttribute('data-theme', 'light')
		localStorage.setItem('theme', 'light')
	}
}
