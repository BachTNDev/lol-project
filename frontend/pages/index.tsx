import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    feature1: "",
    feature2: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          feature1: parseFloat(formData.feature1),
          feature2: parseFloat(formData.feature2),
        }),
      });
      const data = await res.json();
      setResult(data.prediction);
    } catch (error) {
      console.error("Prediction failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Customer Churn Prediction</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md max-w-sm">
        <label className="block mb-4">
          <span className="text-gray-700">Feature 1:</span>
          <input
            type="text"
            name="feature1"
            value={formData.feature1}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded-md"
            placeholder="Enter a number"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Feature 2:</span>
          <input
            type="text"
            name="feature2"
            value={formData.feature2}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded-md"
            placeholder="Enter a number"
            required
          />
        </label>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700"
        >
          Predict
        </button>
      </form>
      {result !== null && (
        <div className="mt-6 text-xl">
          Prediction: <strong>{result}</strong>
        </div>
      )}
    </div>
  );
}
