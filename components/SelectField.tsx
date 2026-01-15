
import React from 'react';

interface SelectFieldProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const SelectField: React.FC<SelectFieldProps> = ({ label, value, options, onChange, disabled }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full group">
      <label className="text-xs font-bold text-slate-400 mr-1 uppercase tracking-wider group-focus-within:text-indigo-600 transition-colors">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="w-full appearance-none bg-white/80 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm hover:border-indigo-200 disabled:opacity-50 disabled:bg-slate-50 cursor-pointer"
        >
          <option value="" disabled>اختر {label}...</option>
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};
