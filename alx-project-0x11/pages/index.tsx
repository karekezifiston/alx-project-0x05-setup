import ImageCard from "@/components/common/ImageCard";
import { ImageProps } from "@/interfaces";
import React, { useState } from "react";

const Home: React.FC = () => {
  // State to store the prompt typed by the user
  const [prompt, setPrompt] = useState<string>("");

  // State to store the currently displayed image
  const [imageUrl, setImageUrl] = useState<string>("");

  // State to keep track of all generated images
  const [generatedImages, setGeneratedImages] = useState<ImageProps[]>([]);

  // State to show loading while the image is being generated
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function to generate a new image using the API
  const handleGenerateImage = async () => {
    setIsLoading(true);

    try {
      const resp = await fetch('/api/generate-image', {
        method: 'POST',
        body: JSON.stringify({ prompt }),
        headers: { 'Content-type': 'application/json' }
      });

      if (!resp.ok) {
        setIsLoading(false);
        alert("Failed to generate image");
        return;
      }

      const data = await resp.json();
      setIsLoading(false);

      // Set the latest generated image
      setImageUrl(data?.message);

      // Keep track of all generated images
      setGeneratedImages(prev => [...prev, { imageUrl: data?.message, prompt }]);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-2">Image Generation App</h1>
        <p className="text-lg text-gray-700 mb-4">
          Generate stunning images based on your prompts!
        </p>

        {/* Input box for user prompt */}
        <div className="w-full max-w-md">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />
          <button
            onClick={handleGenerateImage}
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {isLoading ? "Loading..." : "Generate Image"}
          </button>
        </div>

        {/* Show the latest generated image */}
        {imageUrl && (
          <ImageCard
            action={() => setImageUrl(imageUrl)}
            imageUrl={imageUrl}
            prompt={prompt}
          />
        )}
      </div>

      {/* Show all previously generated images */}
      {generatedImages.length > 0 && (
        <div className="mt-6 w-full max-w-[1100px]">
          <h3 className="text-xl text-center mb-4">Generated Images</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 border p-2 overflow-y-scroll h-96">
            {generatedImages.map(({ imageUrl, prompt }, index) => (
              <ImageCard
                key={index}
                action={() => setImageUrl(imageUrl)} // click to view image again
                imageUrl={imageUrl}
                prompt={prompt}
                width="w-full"
                height="h-40"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
