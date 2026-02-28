function analyze() {
  const input = document.getElementById("input").value.toLowerCase();
  const result = document.getElementById("result");

  if (!input) {
    result.innerText = "No goal detected. 0% seriousness.";
    return;
  }

  let score = Math.floor(Math.random() * 60) + 30;

  if (input.includes("everyday")) score -= 20;
  if (input.includes("5am")) score -= 15;
  if (input.length > 30) score += 10;

  score = Math.max(5, Math.min(score, 95));

  result.innerText = "Believability: " + score + "%";
}
