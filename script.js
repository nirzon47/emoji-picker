// DOM elements
const tbody = document.getElementById('tbody')
const input = document.getElementById('search')
const category = document.getElementById('category')

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
	renderAll()
})

input.addEventListener('input', (e) => {
	renderSearch(e.target.value)
})

// Functions
const renderAll = () => {
	emojiList.forEach((emoji) => {
		const alias = getAlias(emoji)
		const description = getDescription(emoji)

		tbody.innerHTML += `
        <tr>
            <td><span class="w-12 inline-block">${emoji.emoji}</span> <button class="btn btn-primary btn-sm"><i class="fa-solid fa-clipboard"></i></button></td>
            <td class="capitalize">${alias}</td>
            <td>${description}</td>
        </tr>
    `
	})
}

const renderSearch = (query) => {
	tbody.innerHTML = ''
	query = query.toLowerCase()

	emojiList.forEach((emoji) => {
		const alias = getAlias(emoji)

		const description = getDescription(emoji)

		if (
			alias.toLowerCase().includes(query) ||
			description.toLowerCase().includes(query)
		) {
			tbody.innerHTML += `
            <tr>
                <td><span class="w-12 inline-block">${emoji.emoji}</span> <button class="btn btn-primary btn-sm"><i class="fa-solid fa-clipboard"></i></button></td>
                <td class="capitalize">${alias}</td>
                <td>${description}</td>
            </tr>
            `
		}
	})
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
