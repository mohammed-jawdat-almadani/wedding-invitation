import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Download, Users } from 'lucide-react';

export default function AdminRsvpModal({ isOpen, onClose, data }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    if (isOpen) {
      try {
        const saved = JSON.parse(localStorage.getItem('wedding_rsvp_list') || '[]');
        setList(saved);
      } catch {
        setList([]);
      }
    }
  }, [isOpen]);

  const handleClear = () => {
    if (window.confirm('Tüm yanıtları silmek istediğinize emin misiniz?')) {
      localStorage.removeItem('wedding_rsvp_list');
      setList([]);
    }
  };

  const handleExport = () => {
    if (list.length === 0) return;
    const csvContent = "data:text/csv;charset=utf-8,"
      + "Ad Soyad,Durum,Kisi Sayisi,Tarih\n"
      + list.map(e => `"${e.name}","${e.status}","${e.count}","${e.timestamp}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "wedding_rsvp_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          className="relative w-full max-w-md rounded-[28px] bg-[#FAF8F3] border border-gold-400/50 p-6 shadow-2xl flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gold-400/25">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gold-600" />
              <h3 className="font-serif text-xl font-medium text-[#5C4718]">
                {data.controls.adminTitle}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-charcoal-800/60 hover:bg-charcoal-800/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto no-scrollbar py-4 space-y-3">
            {list.length === 0 ? (
              <p className="font-serif italic text-sm text-center text-[#726351] py-8">
                Henüz kayıtlı yanıt bulunmuyor.
              </p>
            ) : (
              list.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl border border-gold-400/30 bg-white/70 shadow-sm flex items-center justify-between"
                >
                  <div className="flex flex-col">
                    <span className="font-serif text-base font-medium text-[#5C4718]">
                      {item.name}
                    </span>
                    <span className="text-[11px] font-serif italic text-[#726351]">
                      {item.timestamp}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-cinzel tracking-wider uppercase ${
                      item.status.includes('Katılacağım') || item.status.includes('يشرفني')
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : 'bg-red-100 text-red-800 border border-red-300'
                    }`}>
                      {item.status}
                    </span>
                    {item.count > 0 && (
                      <span className="block text-xs font-serif text-[#8C7330] mt-0.5">
                        {item.count} Kişi
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {list.length > 0 && (
            <div className="pt-4 border-t border-gold-400/25 flex items-center justify-between">
              <button
                onClick={handleClear}
                type="button"
                className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 font-cinzel"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Temizle</span>
              </button>

              <button
                onClick={handleExport}
                type="button"
                className="btn-luxury px-4 py-1.5 text-xs font-cinzel flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-gold-600" />
                <span>CSV İndir</span>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
