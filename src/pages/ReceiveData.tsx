import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../api/client";

const ReceiveData = () => {
  const { code: urlCode } = useParams();
  const [code, setCode] = useState(urlCode || "");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleReceive = useCallback(
    async (inputCode?: string) => {
      const targetCode = inputCode || code;
      if (!targetCode) return;

      setLoading(true);
      try {
        // Backend theke metadata anchi
        const res = await apiClient.get(`/download/${targetCode}`);
        setData(res.data);
      } catch (err) {
        alert("Invalid or Expired Code!");
        setData(null);
      } finally {
        setLoading(false);
      }
    },
    [code]
  );

  useEffect(() => {
    if (urlCode) {
      handleReceive(urlCode);
    }
  }, [urlCode, handleReceive]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-4xl shadow-2xl border border-slate-50 p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-slate-800">Receive Data</h2>
          <p className="text-slate-400 text-sm">
            Enter the code to fetch content
          </p>
        </div>

        <div className="flex flex-col gap-3 mb-8">
          <input
            placeholder="Enter 6-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 text-center text-2xl font-bold tracking-[5px] outline-none"
          />
          <button
            onClick={() => handleReceive()}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg active:scale-95 transition-all"
          >
            {loading ? "Fetching..." : "View Content"}
          </button>
        </div>

        {data && (
          <div className="animate-in fade-in zoom-in duration-300">
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <p className="text-[10px] font-bold text-blue-500 uppercase mb-2">
                Content Received
              </p>

              {/* Jodi Text ba Link hoy */}
              {data.content ? (
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <p className="text-slate-700 wrap-break-word whitespace-pre-wrap font-medium">
                    {data.content}
                  </p>
                  {data.type === "link" && (
                    <a
                      href={data.content}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 font-bold underline text-sm mt-3 block"
                    >
                      Open Link →
                    </a>
                  )}
                </div>
              ) : (
                /* Jodi File hoy */
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 text-xl">📄</span>
                  </div>
                  <p className="text-slate-800 font-bold mb-1 truncate">
                    {data.fileName}
                  </p>
                  <p className="text-[10px] text-slate-400 mb-4 uppercase">
                    {(data.fileSize / 1024).toFixed(2)} KB •{" "}
                    {data.fileType.split("/")[1]}
                  </p>

                  {/* IMPORTANT: Ekhane Download Link dynamic kora hoyeche */}
                  <a
                    href={`http://192.168.1.107:5000/api/download/${
                      data.shareCode || code
                    }?action=download`}
                    className="inline-block w-full bg-slate-800 text-white py-3 rounded-xl text-sm font-bold active:scale-95 transition-transform shadow-lg text-center"
                  >
                    Download Now
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceiveData;
