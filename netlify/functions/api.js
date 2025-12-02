import Bytez from "bytez.js";

const API_KEY = "82aeed12438e4526e91f4e00a70a5eba"; // sua chave aqui!

export default async (req) => {
  try {
    const body = await req.json();

    const sdk = new Bytez(API_KEY);

    const models = {
      chat: "Qwen/Qwen3-0.6B",
      image: "SG161222/RealVisXL_V5.0",
      video: "ali-vilab/text-to-video-ms-1.7b",
      caption: "nlpconnect/vit-gpt2-image-captioning"
    };

    const modelName = models[body.mode];

    if (!modelName) {
      return new Response(JSON.stringify({ error: "Modo inválido" }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    const model = sdk.model(modelName);

    const { error, output } = await model.run(body.input);

    return new Response(JSON.stringify({ error, output }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { "Content-Type": "application/json" }
    });
  }
};
