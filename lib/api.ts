import axios from 'axios';

export const generateImage = async (prompt: string): Promise<string> => {
  prompt = "A " + prompt + " hair woman";
  try {
    const response = await axios.post('https://07d9-34-143-144-122.ngrok-free.app/generate-image', {
      prompt: prompt,
      negative_prompt: "blurry, low quality, unrealistic, cartoon, distorted, overexposed, underexposed, pixelated",
      scheduler: "EulerAncestralDiscreteScheduler",
      image_height: 768,
      image_width: 768,
      num_images: 1,
      guidance_scale:8.5,
      steps: 100,
      seed: 42
    });

    console.log('API Response:', response.data);

    if (response.data && response.data.images && response.data.images.length > 0) {
      return response.data.images[0];
    } else {
      throw new Error('No images found in response');
    }
  } catch (error) {
    console.error('Error generating image:', error);
    throw new Error('Image generation failed');
  }
};

// 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