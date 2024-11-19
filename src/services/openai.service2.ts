import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

class OpenaiService2 {
  async generatePrompt(data: any) {
    if (typeof data === "object") {
      // get only values
      data = Object.values(data);
      data = JSON.stringify(data);
    }

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "extracts keywords based on the user's input object data. if the value is not English, translate to English. output only English keywords.",
        },
        {
          role: "user",
          content: `user's input data:\n${data}`,
        },
      ],
      model: "gpt-4-turbo",
      temperature: 0.5,
    });

    return completion.choices[0].message.content;
  }

  async generateLogoImages(letter: string, prompt: string) {
    const result = await openai.images.generate({
      model: "dall-e-3",
      prompt: `logo of the letters '${letter}', 

      I want there to be only one picture in the image.
Please create only one image. This means do not create multiple logos in the image.     
 featured on 99designs, white background, logo, flaticon, styled on ${prompt}`,
    });

    return { url: result.data[0].url, filename: result.created };
  }
}

export const openaiService2 = new OpenaiService2();
