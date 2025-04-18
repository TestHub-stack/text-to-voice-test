let selectedVoice = null;

function loadVoices() {
  const voices = window.speechSynthesis.getVoices();
  console.log("Available voices:", voices);

  // Try to find a Hindi voice with Indian accent
  selectedVoice = voices.find(voice =>
    voice.lang === 'hi-IN' && voice.name.toLowerCase().includes('google')
  );

  // Fallback: Indian English
  if (!selectedVoice) {
    selectedVoice = voices.find(voice =>
      voice.lang === 'en-IN' && voice.name.toLowerCase().includes('google')
    );
    console.warn("Falling back to Indian English accent.");
  }

  if (!selectedVoice) {
    alert("No Indian voice found. Try using Google Chrome.");
  }
}

// Attach this to button click
function speakText() {
  const text = document.getElementById("text").value.trim();
  if (!text) {
    alert("कृपया कुछ टेक्स्ट लिखें।");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = selectedVoice?.lang || 'hi-IN';
  utterance.voice = selectedVoice;

  window.speechSynthesis.speak(utterance);
}

// Load voices when ready
window.speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();
