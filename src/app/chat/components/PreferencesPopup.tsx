import { useState } from "react";
import { X } from "lucide-react";

interface Preferences {
  knownLang: string;
  targetLang: string;
  level: "beginner" | "intermediate" | "advanced";
}

interface PreferencesPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (prefs: Preferences) => void;
}

export default function PreferencesPopup({ isOpen, onClose, onSave }: PreferencesPopupProps) {
  const [knownLang, setKnownLang] = useState<string>("");
  const [targetLang, setTargetLang] = useState<string>("");
  const [level, setLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner");

  const handleSave = () => {
    if (knownLang && targetLang) {
      onSave({ knownLang, targetLang, level });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative transform transition-all duration-300 scale-95">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Language Preferences
        </h2>
        <div className="space-y-4">
          <input
            placeholder="Your native language (e.g., English)"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={knownLang}
            onChange={(e) => setKnownLang(e.target.value)}
          />
          <input
            placeholder="Language to learn (e.g., Spanish)"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
          />
          <select
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={level}
            onChange={(e) =>
              setLevel(e.target.value as "beginner" | "intermediate" | "advanced")
            }
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <button
            onClick={handleSave}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}