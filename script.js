async function runVilor() {
  const prompt = document.getElementById("prompt").value;
  const mode = document.getElementById("mode").value;
  const resp = document.getElementById("response");

  resp.innerHTML = "Processando...";

  const input =
    mode === "chat"
      ? [{ role: "user", content: prompt }]
      : prompt;

  const req = await fetch("/api/run", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mode, input })
  });

  const data = await req.json();

  if (data.error) {
    resp.innerHTML = "Erro: " + data.error;
    return;
  }

  if (mode === "chat" || mode === "caption") {
    resp.innerHTML = data.output;
  }

  if (mode === "image") {
    resp.innerHTML = `<img src="${data.output}" width="400">`;
  }

  if (mode === "video") {
    resp.innerHTML = `<video src="${data.output}" controls width="400"></video>`;
  }
}
