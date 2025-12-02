import Bytez from "https://cdn.jsdelivr.net/npm/bytez.js/+esm";

// SUA CHAVE FICARÁ PÚBLICA (opção B)
const key = "82aeed12438e4526e91f4e00a70a5eba";
const sdk = new Bytez(key);

async function runVilor() {
  const prompt = document.getElementById("prompt").value;
  const mode = document.getElementById("mode").value;
  const resp = document.getElementById("response");

  resp.innerHTML = "<b>Processando...</b>";

  // Seleção dos modelos (ocultos do usuário)
  let model;
  if (mode === "chat") model = sdk.model("Qwen/Qwen3-0.6B");
  if (mode === "image") model = sdk.model("SG161222/RealVisXL_V5.0");
  if (mode === "video") model = sdk.model("ali-vilab/text-to-video-ms-1.7b");
  if (mode === "caption") model = sdk.model("nlpconnect/vit-gpt2-image-captioning");

  try {
    // Formatação do input conforme a função
    const input =
      mode === "chat"
        ? [{ role: "user", content: prompt }]
        : prompt;

    const { error, output } = await model.run(input);

    if (error) {
      resp.innerHTML = "<b>Erro:</b> " + error;
      return;
    }

    // Exibição dependendo do modo
    if (mode === "chat") {
      resp.innerHTML = "<b>Resposta:</b><br>" + output;
    }

    if (mode === "caption") {
      resp.innerHTML = "<b>Legenda detectada:</b><br>" + output;
    }

    if (mode === "image") {
      resp.innerHTML = `<b>Imagem gerada:</b><br><img src="${output}" width="400">`;
    }

    if (mode === "video") {
      resp.innerHTML = `<b>Vídeo gerado:</b><br><video src="${output}" width="400" controls></video>`;
    }
  } catch (err) {
    resp.innerHTML = "<b>Erro interno:</b> " + err.message;
  }
}
