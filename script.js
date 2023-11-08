// DOM elements
const tbody = document.getElementById('tbody')
const input = document.getElementById('search')
const category = document.getElementById('category')

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

// Functions
const renderRows = (query = '', category = 'All') => {
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
							<td><span class="w-12 inline-block">${emoji.emoji}</span><button class="btn btn-primary btn-sm"><i class="fa-solid fa-clipboard"></i></button></td>
							<td class="capitalize">${alias}</td>
							<td>${description}</td>
							`
			fragment.appendChild(row)
		}
	})

	tbody.innerHTML = ''
	tbody.appendChild(fragment)
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
