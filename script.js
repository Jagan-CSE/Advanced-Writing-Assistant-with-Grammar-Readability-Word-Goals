async function processText() {
    const inputText = document.getElementById("inputText").value;
    const wordGoal = parseInt(document.getElementById("wordGoal").value);
    const outputDiv = document.getElementById("output");
  
    // Call LanguageTool API
    const response = await fetch("https://api.languagetoolplus.com/v2/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        text: inputText,
        language: "en-US"
      })
    });
  
    const result = await response.json();
    let correctedText = inputText;
  
    // Apply suggestions
    result.matches.reverse().forEach(match => {
      if (match.replacements && match.replacements.length > 0) {
        correctedText = 
          correctedText.slice(0, match.offset) +
          match.replacements[0].value +
          correctedText.slice(match.offset + match.length);
      }
    });
  
    const wordCount = correctedText.trim().split(/\s+/).length;
    let finalText = correctedText;
  
    // Word goal logic
    if (!isNaN(wordGoal) && wordGoal > wordCount) {
      finalText += "\n\n" + "This content may be elaborated further to meet the required length. ".repeat(Math.ceil((wordGoal - wordCount) / 10));
    }
  
    // Output
    outputDiv.innerText = `--- Corrected Sentence ---\n${finalText}\n\nWord Count: ${wordCount}`;
  }
  