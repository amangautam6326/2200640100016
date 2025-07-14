import React, { useState } from 'react';

const MAX_URLS = 5;

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export default function UrlShortener() {
  const [inputs, setInputs] = useState([
    { originalUrl: '', validity: '', shortcode: '', error: '' },
  ]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    newInputs[index].error = '';
    setInputs(newInputs);
  };

  const addUrlField = () => {
    if (inputs.length < MAX_URLS) {
      setInputs([...inputs, { originalUrl: '', validity: '', shortcode: '', error: '' }]);
    }
  };

  const validateInputs = () => {
    const newInputs = inputs.map((input) => {
      if (!input.originalUrl.trim()) {
        return { ...input, error: 'Original URL is required' };
      }
      if (!isValidUrl(input.originalUrl)) {
        return { ...input, error: 'Invalid URL format' };
      }
      if (input.validity && (!/^\d+$/.test(input.validity) || parseInt(input.validity) <= 0)) {
        return { ...input, error: 'Validity must be a positive integer' };
      }
      return { ...input, error: '' };
    });
    setInputs(newInputs);
    return newInputs.every((input) => input.error === '');
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    // Mock API simulation (replace with real API call)
    const newResults = inputs.map((input) => {
      const days = parseInt(input.validity || '30');
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + days);
      const shortcode = input.shortcode || Math.random().toString(36).substring(2, 8);
      return {
        originalUrl: input.originalUrl,
        shortUrl: `https://sho.rt/${shortcode}`,
        expiry: expiryDate.toDateString(),
      };
    });

    setResults(newResults);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">URL Shortener</h1>

      {inputs.map((input, index) => (
        <div key={index} className="border p-4 rounded space-y-2">
          <div>
            <label className="block font-medium">Original URL *</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={input.originalUrl}
              onChange={(e) => handleChange(index, 'originalUrl', e.target.value)}
              placeholder="https://example.com/very/long/link"
            />
          </div>

          <div>
            <label className="block font-medium">Validity Period (in days)</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={input.validity}
              onChange={(e) => handleChange(index, 'validity', e.target.value)}
              placeholder="e.g., 80"
            />
          </div>

          <div>
            <label className="block font-medium">Preferred Shortcode</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={input.shortcode}
              onChange={(e) => handleChange(index, 'shortcode', e.target.value)}
              placeholder="optional-code"
            />
          </div>

          {input.error && (
            <div className="text-red-600 text-sm font-medium">{input.error}</div>
          )}
        </div>
      ))}

      {inputs.length < MAX_URLS && (
        <button
          onClick={addUrlField}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Add Another URL
        </button>
      )}

      <button
        onClick={handleSubmit}
        className="block w-full mt-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Shorten URLs
      </button>

      {results.length > 0 && (
        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">Results</h2>
          {results.map((res, idx) => (
            <div key={idx} className="bg-gray-100 p-4 rounded">
              <p><strong>Original:</strong> {res.originalUrl}</p>
              <p>
                <strong>Shortened:</strong>{' '}
                <a href={res.shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {res.shortUrl}
                </a>
              </p>
              <p><strong>Expires on:</strong> {res.expiry}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
