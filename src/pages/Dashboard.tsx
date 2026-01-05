import { authClient } from "../api/auth-client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/client"; // API client import korun

export const Dashboard = () => {
  const { data: session, isPending } = authClient.useSession();
  const navigate = useNavigate();
  
  // File state gulo add kora holo
  const [files, setFiles] = useState<any[]>([]);
  const [fetchingFiles, setFetchingFiles] = useState(true);

  // File fetch korar effect
  useEffect(() => {
    const fetchUserFiles = async () => {
      try {
        const response = await apiClient.get("/user-files");
        setFiles(response.data);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setFetchingFiles(false);
      }
    };

    if (session) {
      fetchUserFiles();
    }
  }, [session]);

  if (isPending) return <div className="p-10 text-center font-bold text-slate-500">Loading Dashboard...</div>;
  if (!session) {
    navigate("/login");
    return null;
  }

  const user = session.user;
  const totalStorage = 50 * 1024 * 1024 * 1024;
  const storageUsed = Number((user as any).storageUsed || 0);
  const usedPercentage = (storageUsed / totalStorage) * 100;

  const handleLogout = async () => {
    await authClient.signOut();
    navigate("/");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* 1. Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-800">Welcome, {user.name}!</h1>
          <p className="text-slate-500 text-sm">Manage your shared files and 50GB storage.</p>
        </div>
        <button 
          onClick={handleLogout}
          className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold hover:bg-red-100 transition active:scale-95"
        >
          Logout
        </button>
      </div>

      {/* 2. Storage Overview Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-end mb-4">
            <h3 className="font-bold text-slate-700 text-lg">Cloud Storage</h3>
            <span className="text-sm font-bold text-blue-600">
              {(storageUsed / (1024 * 1024)).toFixed(2)} MB / 50 GB
            </span>
          </div>
          <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden">
            <div 
              className="bg-blue-600 h-full transition-all duration-1000 ease-out" 
              style={{ width: `${usedPercentage}%` }}
            ></div>
          </div>
          <p className="mt-4 text-xs text-slate-400 font-medium">
            You are using {usedPercentage.toFixed(4)}% of your free quota.
          </p>
        </div>

        <div className="bg-linear-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl text-white shadow-xl shadow-blue-100 flex flex-col justify-center">
          <h3 className="font-bold text-lg mb-2">Go Pro</h3>
          <p className="text-sm opacity-80 mb-6">Need more than 50GB? Upgrade for unlimited sharing.</p>
          <button className="bg-white text-blue-600 w-full py-3 rounded-xl font-black hover:scale-105 transition-all">
            Upgrade Now
          </button>
        </div>
      </div>

      {/* 3. Files List Section */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Your Shared History</h3>
          <span className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full font-bold">
            {files.length} Files
          </span>
        </div>

        <div className="min-h-75">
          {fetchingFiles ? (
            <div className="p-20 text-center text-slate-400 animate-pulse">Fetching your data...</div>
          ) : files.length > 0 ? (
            <div className="divide-y divide-slate-50">
              {files.map((file) => (
                <div key={file.id} className="p-4 hover:bg-slate-50 transition-colors flex justify-between items-center px-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-xl">
                      {file.type === 'link' ? '🔗' : '📄'}
                    </div>
                    <div>
                      <p className="font-bold text-slate-700 truncate max-w-50 md:max-w-md">
                        {file.name || "Unnamed Share"}
                      </p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                        {new Date(file.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-blue-600 font-black font-mono tracking-tighter text-lg">
                      {file.shareCode}
                    </div>
                    <p className="text-[10px] text-slate-300 font-bold uppercase">Code</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-20 text-center">
              <div className="text-5xl mb-4 grayscale opacity-20">📁</div>
              <p className="text-slate-400 font-medium">No files uploaded yet.</p>
              <button 
                onClick={() => navigate("/share")}
                className="mt-4 text-blue-600 font-bold hover:underline"
              >
                Start Sharing →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};