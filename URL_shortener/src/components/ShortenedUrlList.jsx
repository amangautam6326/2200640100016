import React, { useEffect, useState } from 'react';

export default function ShortenedUrlList() {
  const [urlData, setUrlData] = useState([]);

  useEffect(() => {
    const mockData = [
      {
        id: 1,
        shortUrl: 'https://sho.rt/ABC23',
        originalUrl: 'https://example.com/page1',
        createdAt: '2025-07-10T10:00:00Z',
        expiresAt: '2025-08-10T10:00:00Z',
        totalClicks: 3,
        clicks: [
          {
            timestamp: '2025-07-11T12:34:56Z',
            referrer: 'https://google.com',
            location: 'India',
          },
          {
            timestamp: '2025-07-12T08:20:00Z',
            referrer: 'https://twitter.com',
            location: 'United States of america',
          },
          {
            timestamp: '2025-07-13T19:45:22Z',
            referrer: '',
            location: 'Germany',
          },
        ],
      },
      {
        id: 2,
        shortUrl: 'https://sho.rt/XYZ789',
        originalUrl: 'https://another.com/thing',
        createdAt: '2025-07-12T15:30:00Z',
        expiresAt: '2025-08-12T15:30:00Z',
        totalClicks: 1,
        clicks: [
          {
            timestamp: '2025-07-13T10:12:00Z',
            referrer: 'https://instagram.com',
            location: 'london',
          },
        ],
      },
    ];

    setUrlData(mockData);
  }, []);

  const formatDate = (iso) => new Date(iso).toLocaleString();

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">📊 Shortened URL History</h1>

      {urlData.length === 0 ? (
        <p className="text-gray-600">No shortened URLs found.</p>
      ) : (
        urlData.map((entry) => (
          <div key={entry.id} className="bg-white p-6 rounded shadow space-y-4">
            <div>
              <h2 className="text-lg font-semibold">
                <a
                  href={entry.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {entry.shortUrl}
                </a>
              </h2>
              <p className="text-sm text-gray-500">Original: {entry.originalUrl}</p>
              <p className="text-sm text-gray-600">
                Created: {formatDate(entry.createdAt)} | Expires: {formatDate(entry.expiresAt)}
              </p>
              <p className="mt-1 font-medium">Total Clicks: {entry.totalClicks}</p>
            </div>

            {entry.clicks.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full table-auto text-sm border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left">#</th>
                      <th className="px-4 py-2 text-left">Timestamp</th>
                      <th className="px-4 py-2 text-left">Referrer</th>
                      <th className="px-4 py-2 text-left">Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entry.clicks.map((click, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">{formatDate(click.timestamp)}</td>
                        <td className="px-4 py-2">
                          {click.referrer ? (
                            <a href={click.referrer} className="text-blue-500 underline" target="_blank" rel="noreferrer">
                              {click.referrer}
                            </a>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                        <td className="px-4 py-2">{click.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
