// AOS init
AOS.init({
	once: true,
	duration: 1000,
	offset: -700,
})

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

/**
 * Renders the rows of emojis based on the given query and category.
 *
 * @param {string} query - The query string to filter the emojis.
 * @param {string} category - The category of emojis to filter.
 * @return {void} This function does not return anything.
 */
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
			row.setAttribute('data-aos', 'fade-right')

			fragment.appendChild(row)
		}
	})

	tbody.innerHTML = ''
	tbody.appendChild(fragment)

	addClickEvent()
}

/**
 * Returns the alias of the given emoji.
 *
 * @param {string} emoji - The emoji for which to retrieve the alias.
 * @return {string} The alias of the emoji.
 */
const getAlias = (emoji) => {
	const alias = emoji.aliases
		.toString()
		.replaceAll('_', ' ')
		.replaceAll(',', ', ')

	return alias
}

/**
 * Returns the capitalized description of an emoji.
 *
 * @param {string} emoji - The emoji to get the description for.
 * @return {string} The capitalized description of the emoji.
 */
const getDescription = (emoji) => {
	const description =
		emoji.description.charAt(0).toUpperCase() + emoji.description.slice(1)

	return description
}

/**
 * Copies the given emoji to the clipboard.
 *
 * @param {string} emoji - The emoji to be copied.
 * @return {undefined} This function does not return a value.
 */
const copy = (emoji) => {
	navigator.clipboard.writeText(emoji)
}

/**
 * Toggles the theme of the web page between light and dark.
 *
 * @param {none} - No parameters.
 * @return {none} - No return value.
 */
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
