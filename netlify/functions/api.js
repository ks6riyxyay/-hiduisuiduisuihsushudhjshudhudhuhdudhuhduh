import Bytez from "bytez.js";

export default async (req) => {
  try {
    const body = await req.json();

    const sdk = new Bytez(process.env.BYTEZ_KEY);

    const models = {
      chat: "Qwen/Qwen3-0.6B",
      image: "SG161222/RealVisXL_V5.0",
      video: "ali-vilab/text-to-video-ms-1.7b",
      caption: "nlpconnect/vit-gpt2-image-captioning"
    };

    const model = sdk.model(models[body.mode]);

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
