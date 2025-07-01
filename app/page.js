"use client";
import { useState, useEffect, useRef } from "react";

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

export default function Home() {
  const [length, setLength] = useState(12);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const passwordRef = useRef(null);

  useEffect(() => {
    generatePassword();
  }, []);

  useEffect(() => {
    let score = 0;
    
    score += Math.min(length / 32 * 50, 50);
    
    if (uppercase) score += 12.5;
    if (lowercase) score += 12.5;
    if (numbers) score += 12.5;
    if (symbols) score += 12.5;
    
    setStrength(Math.round(score));
  }, [length, uppercase, lowercase, numbers, symbols]);

  function generatePassword() {
    setIsGenerating(true);
    
    let chars = "";
    if (uppercase) chars += UPPERCASE;
    if (lowercase) chars += LOWERCASE;
    if (numbers) chars += NUMBERS;
    if (symbols) chars += SYMBOLS;
    
    if (!chars) return setPassword("");
    
    let pwd = "";
    for (let i = 0; i < length; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    setPassword(pwd);
    setCopied(false);
    
    setTimeout(() => setIsGenerating(false), 500);
  }

  function copyToClipboard() {
    if (!password) return;
    
    navigator.clipboard.writeText(password);
    setCopied(true);
    
    if (passwordRef.current) {
      passwordRef.current.classList.add("animate-pulse");
      setTimeout(() => {
        if (passwordRef.current) {
          passwordRef.current.classList.remove("animate-pulse");
        }
      }, 1000);
    }
    
    setTimeout(() => setCopied(false), 2000);
  }

  const getStrengthColor = () => {
    if (strength < 25) return "bg-red-500";
    if (strength < 50) return "bg-orange-500";
    if (strength < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthLabel = () => {
    if (strength < 25) return "Very Weak";
    if (strength < 50) return "Weak";
    if (strength < 75) return "Medium";
    if (strength < 90) return "Strong";
    return "Very Strong";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-6 flex flex-col gap-6 transform transition-all duration-300 hover:scale-[1.01]">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
            </svg>
            Password Generator
          </h1>
          <p className="text-blue-200">Create secure passwords instantly</p>
        </div>
        
        <div className="flex flex-col gap-6">
          <div className="relative">
            <div 
              ref={passwordRef}
              className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white font-mono text-lg tracking-wider border-2 border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            >
              {showPassword ? password : password.replace(/./g, "•")}
            </div>
            
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="p-1.5 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                )}
              </button>
              
              <button
                onClick={generatePassword}
                disabled={isGenerating}
                className="p-1.5 rounded-md bg-gray-800 hover:bg-blue-600 transition-colors disabled:opacity-50"
                title="Generate new password"
              >
                {isGenerating ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 animate-spin" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          <div className="bg-gray-900/50 rounded-lg p-3">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-300">Password Strength</span>
              <span className={`text-sm font-bold ${getStrengthColor().replace('bg-', 'text-')}`}>
                {getStrengthLabel()}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${getStrengthColor()} transition-all duration-500`}
                style={{ width: `${strength}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-2 text-white">
                <div className="flex justify-between">
                  <span>Password Length</span>
                  <span className="text-blue-300 font-bold">{length}</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={32}
                  value={length}
                  onChange={e => setLength(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </label>
              
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-3 p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors cursor-pointer">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      checked={uppercase} 
                      onChange={e => setUppercase(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`block w-10 h-5 rounded-full transition-colors ${uppercase ? 'bg-blue-500' : 'bg-gray-600'}`}></div>
                    <div className={`absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform ${uppercase ? 'transform translate-x-5' : ''}`}></div>
                  </div>
                  <span className="text-white">Uppercase</span>
                </label>
                
                <label className="flex items-center gap-3 p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors cursor-pointer">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      checked={lowercase} 
                      onChange={e => setLowercase(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`block w-10 h-5 rounded-full transition-colors ${lowercase ? 'bg-blue-500' : 'bg-gray-600'}`}></div>
                    <div className={`absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform ${lowercase ? 'transform translate-x-5' : ''}`}></div>
                  </div>
                  <span className="text-white">Lowercase</span>
                </label>
                
                <label className="flex items-center gap-3 p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors cursor-pointer">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      checked={numbers} 
                      onChange={e => setNumbers(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`block w-10 h-5 rounded-full transition-colors ${numbers ? 'bg-blue-500' : 'bg-gray-600'}`}></div>
                    <div className={`absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform ${numbers ? 'transform translate-x-5' : ''}`}></div>
                  </div>
                  <span className="text-white">Numbers</span>
                </label>
                
                <label className="flex items-center gap-3 p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors cursor-pointer">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      checked={symbols} 
                      onChange={e => setSymbols(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`block w-10 h-5 rounded-full transition-colors ${symbols ? 'bg-blue-500' : 'bg-gray-600'}`}></div>
                    <div className={`absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform ${symbols ? 'transform translate-x-5' : ''}`}></div>
                  </div>
                  <span className="text-white">Symbols</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={generatePassword}
              disabled={isGenerating}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-spin" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  Generate
                </>
              )}
            </button>
            
            <button
              onClick={copyToClipboard}
              disabled={!password}
              className={`flex-1 flex items-center justify-center gap-2 ${
                copied ? "bg-green-600 hover:bg-green-700" : "bg-gray-700 hover:bg-gray-600"
              } text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50`}
            >
              {copied ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
        
        <div className="mt-4 bg-gray-900/30 rounded-lg p-4 border border-gray-700">
          <h3 className="text-sm font-bold text-blue-300 mb-2 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Password Tips
          </h3>
          <ul className="text-xs text-gray-300 space-y-1">
            <li>• Use at least 12 characters</li>
            <li>• Combine letters, numbers, and symbols</li>
            <li>• Avoid common words or patterns</li>
            <li>• Use unique passwords for each account</li>
          </ul>
        </div>
      </div>
    </div>
  );
}