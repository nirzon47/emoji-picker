// DOM elements
const tbody = document.getElementById('tbody')
const spinner = document.getElementById('spinner')

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
	renderAll()
})

// Functions
const renderAll = () => {
	emojiList.forEach((emoji) => {
		const alias = emoji.aliases
			.toString()
			.replaceAll('_', ' ')
			.replaceAll(',', ', ')

		const description =
			emoji.description.charAt(0).toUpperCase() + emoji.description.slice(1)

		tbody.innerHTML += `
        <tr>
            <td><span class="w-12 inline-block">${emoji.emoji}</span> <button class="btn btn-primary btn-sm"><i class="fa-solid fa-clipboard"></i></button></td>
            <td class="capitalize">${alias}</td>
            <td>${description}</td>
        </tr>
    `
	})
}
