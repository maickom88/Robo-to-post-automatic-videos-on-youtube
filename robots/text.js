const algo = require('algorithmia')

const algorithmiaApiKey = require('../credencials/algorithmia.json').apiKey

async function robot(content){
	await fetchContentFromWikipedia(content)
	sanitizeContent(content)
	//breakContentIntoSentences(content)

	async function fetchContentFromWikipedia(content){
		const algorithmiaAuthenticated = algo(algorithmiaApiKey)
		const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')
		const wikipediaResponde = await wikipediaAlgorithm.pipe(content.searchTerm)
		const wikipediaContent = wikipediaResponde.get()

		content.sourceContentOriginal = wikipediaContent.content
	}

	 function sanitizeContent(content){
		const withoutBlankLines = removeBlankLines(content.sourceContentOriginal)
		console.log(withoutBlankLines)
		function removeBlankLines(text){
			const allines = text.split('\n')
			const withoutBlankLines = allines.filter((line) => {
				if(line.trim().length === 0 ){
					return false
				}
				else{
					return true
				}
			})
			return withoutBlankLines
		}
	}


}


module.exports = robot