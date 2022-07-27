const tableBody = document.getElementById('table-body')

let flights = [
	{
		time: "08:11",
		destination: "OMAN",
		flight: "0X 203",
		gate: "A 01",
		remarks: "ON TIME"
	},
	{
		time: "12:39",
		destination: "LONDON",
		flight: "CL 320",
		gate: "C 31",
		remarks: "CANCELLED"
	},
	{
		time: "13:21",
		destination: "DUBAI",
		flight: "DXB 201",
		gate: "A 19",
		remarks: "CANCELLED"
	},
	{
		time: "14:01",
		destination: "FRANKFURT",
		flight: "FR 420",
		gate: "B 02",
		remarks: "ON TIME"
	},
	{
		time: "15:21",
		destination: "TOKYO",
		flight: "TK 500",
		gate: "B 32",
		remarks: "DELAYED"
	}
]

const destinations = ["TOKYO", "LONDON","BOSTON","NEW YORK", "BEJING", "NAPAL","DALLAS", "OMAN","BEIRUT"]
const remarks = ["ON TIME", "DELAYED", "CANCELLED"]
let hour = 22

function populateTable() {
	for (const flight of flights) {
		const tableRow = document.createElement("tr")

		for(const flightDetail in flight) {
			const tableCell = document.createElement("td")
			const word = Array.from(flight[flightDetail])

			for(const [index,letter] of word.entries()) {
				const letterElement = document.createElement('div')

				setTimeout(() => {
					letterElement.classList.add('flip')
					letterElement.textContent = letter
					tableCell.append(letterElement)
				}, 100 * index)
			}
			tableRow.append(tableCell)
		}
		tableBody.append(tableRow)
	}
}


populateTable()

function generateRandomLetter(){
	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	return alphabet.charAt(Math.floor(Math.random() * alphabet.length))
}
function generateRandomNumber(maxNumber){
	const numbers = "1234567890"
	if(maxNumber){
		const newNumbers = numbers.slice(0, maxNumber)
		return newNumbers.charAt(Math.floor(Math.random() * newNumbers.length))
	}
	return numbers.charAt(Math.floor(Math.random() * numbers.length))
}

function generateTime(){
	let displayHour = hour

	if(hour < 24){
		hour++
	}
	if(hour >= 24){
		hour = 1
		displayHour = hour
	}
	if(hour < 10){
		displayHour = "0"
		displayHour = displayHour + hour
	}

	return displayHour + ":" + generateRandomNumber(5) + generateRandomNumber();
}

function shuffleUp(){
	flights.shift()
	flights.push({
		time: generateTime(),
		destination: destinations[Math.floor(Math.random() * destinations.length)],
		flight: generateRandomLetter()+generateRandomLetter()+ " "+generateRandomNumber()+generateRandomNumber()+generateRandomNumber(),
		gate: generateRandomLetter() + " " + generateRandomNumber() + generateRandomNumber(),
		remarks:  remarks[Math.floor(Math.random() * remarks.length)]
	})
	tableBody.textContent = ""
	populateTable()
}

setInterval(shuffleUp, 3000) 