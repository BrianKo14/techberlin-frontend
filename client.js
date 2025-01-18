
var contextDialogue = {};


// INTERVIEW ENDPOINTS

async function startInterview() {
	try {

	    const response = await fetch('/interview/start-interview', {
		method: 'GET',
		headers: {
		    'Content-Type': 'application/json'
		}
	    });
    
	    const responseData = await response.json();
    
	    contextDialogue = responseData.context_dialogue;
	    const audioDataHex = responseData.audio_data;
    
	    // Convert the hex audio data back to a binary blob
	    const audioBlob = convertHexToBlob(audioDataHex);
    
	    // Create an object URL for the audio blob
	    const audioURL = URL.createObjectURL(audioBlob);

	    // TODO: We have `audioURL` that can be used in the UI

	} catch (error) {
	    console.error('Error starting the interview:', error);
	}
}

async function getNextQuestion() {
	try {

		// Create a FormData object to hold the audio file and metadata
		const formData = new FormData();
		formData.append('audio', audioFile); // Audio file to send
		formData.append('metadata', JSON.stringify(contextDialogue)); // Dialogue history metadata

		// Make a POST request to the endpoint
		const response = await fetch('/interview/next-question', {
			method: 'POST',
			body: formData // Send FormData as the body
		});

		const responseData = await response.json();

		contextDialogue = responseData.context_dialogue;
		const audioDataHex = responseData.audio_data;

		// Convert the hex audio data back to a binary blob
		const audioBlob = convertHexToBlob(audioDataHex);

		// Create an object URL for the audio blob
		const audioURL = URL.createObjectURL(audioBlob);

		// TODO: We have `audioURL` that can be used in the UI	

	} catch (error) {
		console.error('Error getting the next question:', error);
	}
		
}

function convertHexToBlob(hex) {
    return new Blob([Uint8Array.from(hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)))], { type: 'audio/mpeg' });
}



// MATCHES ENDPOINTS

async function fetchMatches() {
	try {

		const response = await fetch('/matches/get-matches', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json'},
		});

		const matches = await response.json();

		return matches;

	} catch (error) {
		console.error('Failed to fetch matches:', error);
	}
}