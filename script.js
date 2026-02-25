function save() {
  const text = document.getElementById("log").value;
  localStorage.setItem("week", text);
}

function generate() {
  const text = localStorage.getItem("week") || "built and refined projects";
  document.getElementById("summary").innerText =
    "This week focused on " + text + ". Progress steady.";
}

