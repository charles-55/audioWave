// Check for browser support
if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
  alert('Sorry, your browser does not support Speech Recognition.');
} else {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  // Set recognition properties
  recognition.lang = 'en-US'; // Set the language
  recognition.interimResults = true; // Show interim results
  recognition.continuous = true; // Continue listening

  const startBtn = document.getElementById('start-btn');
  const stopBtn = document.getElementById('stop-btn');
  const clearBtn = document.getElementById('clear-btn');
  const copyBtn = document.getElementById('copy-btn');
  const transcription = document.getElementById('transcription');

  let finalTranscript = '';

  // Start listening
  startBtn.addEventListener('click', () => {
    recognition.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
    transcription.innerHTML = 'Listening...';
  });

  // Stop listening
  stopBtn.addEventListener('click', () => {
    recognition.stop();
    startBtn.disabled = false;
    stopBtn.disabled = true;
  });

  // Clear output
  clearBtn.addEventListener('click', () => {
    transcription.innerHTML = '';
    finalTranscript = '';
  });

  // Copy output
  copyBtn.addEventListener('click', () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(transcription.innerHTML).then(() => {
        alert('Text copied to clipboard!');
      }).catch(err => {
        alert('Failed to copy text: ' + err);
      });
    } else {
      alert('Clipboard API not supported.');
    }
  });

  // On result event
  recognition.onresult = (event) => {
    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript + ' ';
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }
    transcription.innerHTML = finalTranscript + interimTranscript;
  };

  // Handle errors
  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    transcription.innerHTML = `Error: ${event.error}`;
  };

  // On speech end
  recognition.onend = () => {
    startBtn.disabled = false;
    stopBtn.disabled = true;
  };
}
