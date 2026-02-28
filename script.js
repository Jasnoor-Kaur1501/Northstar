function analyze() {
  const text = document.getElementById("input").value.toLowerCase();
  const result = document.getElementById("result");

  if (!text) {
    result.innerText = "You didn't even type anything. Suspicious.";
    return;
  }

  const responses = [
    "Conviction level: 23%. This feels temporary.",
    "Founder energy detected. 78% believable.",
    "Be honest. You're excited, not committed.",
    "Motivation spike. Sustainability unclear.",
    "This might actually happen. 65% real.",
    "2am confidence detected."
  ];

  const random = Math.floor(Math.random() * responses.length);
  result.innerText = responses[random];
}
