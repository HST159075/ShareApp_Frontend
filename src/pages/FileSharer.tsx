import React, { useState, ChangeEvent } from "react";
import { QRCodeSVG } from "qrcode.react";
import apiClient from '../api/client';

const FileSharer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState<string>("");
  const [shareLink, setShareLink] = useState<string>("");
  const [shareCode, setShareCode] = useState<string>(""); 
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault(); 
    if (!file) return;
    setLoading(true);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await apiClient.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if(response.data.code) {
        // 🌟 Fix: Automatically use the current Frontend URL (Port 3000)
        // QR scan korle jeno direct UI te jay, API te noy
        const frontendUrl = `${window.location.origin}/receive/${response.data.code}`;
        setShareLink(frontendUrl);
        setShareCode(response.data.code);
      }
    } catch (error: any) {
      alert(`Upload failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTextShare = async (e: React.MouseEvent, type: 'text' | 'link') => {
    e.preventDefault(); 
    if (!textContent) return alert("Please enter text");
    
    setLoading(true);
    try {
      const response = await apiClient.post('/share-text', { 
        content: textContent,
        type: type 
      });
      
      if(response.data.code) {
        const frontendUrl = `${window.location.origin}/receive/${response.data.code}`;
        setShareLink(frontendUrl);
        setShareCode(response.data.code);
      }
    } catch (error: any) {
      alert("Sharing failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full text-left">
      <div className="border-2 border-dashed border-slate-200 p-8 rounded-2xl bg-slate-50/50">
        <h3 className="text-lg font-bold text-slate-700 mb-4 tracking-tight">Step 1: Share a File</h3>
        <input 
          type="file" 
          onChange={handleFileChange} 
          className="block w-full text-sm text-slate-500 mb-4 cursor-pointer"
        />
        <button
          type="button" 
          onClick={handleFileUpload}
          disabled={!file || loading}
          className={`w-full py-3 rounded-xl font-bold transition-all ${
            file && !loading ? 'bg-blue-600 text-white shadow-lg active:scale-95' : 'bg-slate-200 text-slate-400'
          }`}
        >
          {loading ? "Uploading..." : "Generate File QR & Code"}
        </button>
      </div>

      <div className="p-6 bg-white border border-slate-200 rounded-2xl">
        <h3 className="text-lg font-bold text-slate-700 mb-4 tracking-tight">OR Share Text/Link</h3>
        <textarea 
          placeholder="Paste link or type text here..."
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
          className="w-full h-24 p-3 border border-slate-200 rounded-xl mb-4 text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/30"
        />
        <div className="flex gap-4">
          <button type="button" onClick={(e) => handleTextShare(e, 'text')} className="flex-1 bg-slate-800 text-white py-2 rounded-lg font-semibold hover:bg-black transition-all">Share Text</button>
          <button type="button" onClick={(e) => handleTextShare(e, 'link')} className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg font-semibold hover:bg-blue-200 transition-all">Share Link</button>
        </div>
      </div>

      {shareCode && (
        <div className="bg-white border border-blue-100 p-6 rounded-4xl text-center shadow-lg animate-in fade-in zoom-in duration-300">
          <h3 className="text-slate-800 font-bold mb-2">Success!</h3>
          <div className="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Your Receive Code</p>
            <h2 className="text-4xl font-black text-blue-600 tracking-[10px]">{shareCode}</h2>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-inner">
              <QRCodeSVG value={shareLink} size={150} />
            </div>
            <p className="text-[10px] text-blue-400 break-all font-mono">{shareLink}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileSharer;