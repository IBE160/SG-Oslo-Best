import React from 'react';

const HistoryList = ({ applications }) => {
  if (!applications || applications.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-800 rounded-lg border border-gray-700">
        <p className="text-gray-300 text-lg">Ingen historikk funnet.</p>
        <p className="text-gray-500 text-sm mt-2">Generer en søknad først!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((app) => (
        <div key={app.id} className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-md hover:border-blue-500 transition-colors">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-bold text-white">
                {app.job_description ? app.job_description.substring(0, 40) + "..." : "Søknad"}
              </h3>
              <p className="text-gray-400 text-sm">
                {new Date(app.created_at).toLocaleDateString('no-NO', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div className="bg-blue-900 text-blue-200 text-xs px-2 py-1 rounded">
              Score: {app.analysis_json?.score || 'N/A'}%
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-700">
             <p className="text-gray-300 text-sm mb-2 font-semibold">Følgebrev utdrag:</p>
             <p className="text-gray-400 text-sm italic">
               "{app.cover_letter_text ? app.cover_letter_text.substring(0, 100) : ""}..."
             </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryList;
