import { useState, ChangeEvent } from 'react';
import axios from 'axios';

const AniClassify: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [predictedCategory, setPredictedCategory] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post<{ predicted_category: string }>('/api/classify/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setPredictedCategory(response.data.predicted_category);
    } catch (error) {
      console.error('An error occurred while uploading:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold mb-4">AniClassify: Animal Image Classification</h1>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border rounded-md p-2 mb-4"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Classify
        </button>
        {predictedCategory && (
          <p className="mt-4">Predicted Category: {predictedCategory}</p>
        )}
      </div>
    </div>
  );
};

export default AniClassify;
