import { streamText } from "ai";
import { openRouter } from "../lib/ai";

export default {
  async generaterecipe(prompt: string) {
    const result = streamText({
      model: openRouter("meta-llama/llama-3.3-70b-instruct:free"),
      prompt,
      system:
        "Actua como un bartender y genera una receta para un coctel con el formato: Nombre:{Nombre de la bebida] Ingredientes: [Lista de ingredientes] Preparación: [Pasos de preparación] (solo este informacion, simple y clara), si lo que ingresan no corresponde a bebidas o ingredientes, puedes decir algo como, esto no esta relacionado a cocteles, por favor ingresa una bebida o un ingrediente",
      temperature: 1,
    });
    return result.textStream;
  },
};
