document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("btn");
  const input = document.getElementById("input");
  const result = document.getElementById("result");

  btn.addEventListener("click", function () {
    const text = input.value.toLowerCase();

    if (!text) {
      result.innerText = "No input detected. Commitment level: 0%.";
      return;
    }

    let score = Math.floor(Math.random() * 60) + 20; // 20–80%

    if (text.includes("everyday") || text.includes("daily")) score -= 20;
    if (text.includes("wake up at 5")) score -= 15;
    if (text.includes("start")) score -= 10;
    if (text.length > 40) score += 10;

    score = Math.max(5, Math.min(score, 95));

    let message;

    if (score < 30) {
      message = "Temporary motivation detected.";
    } else if (score < 60) {
      message = "Some conviction present.";
    } else {
      message = "Founder energy detected.";
    }

    result.innerHTML = `
      <strong>Believability: ${score}%</strong><br>
      ${message}
    `;
  });
});
