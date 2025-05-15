"use client";


import { useState } from "react";
import { BsCopy } from "react-icons/bs";

export default function AdminCredentials() {
  const [copied, setCopied] = useState({
    email: false,
    password: false,
  });

  const adminCredentials = {
    email: "test.admi.hasti@gmail.com",
    password: "DemoAdmin123!",
  };

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopied((prev) => ({ ...prev, [field]: true }));
    setTimeout(() => {
      setCopied((prev) => ({ ...prev, [field]: false }));
    }, 2000);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
      <h2 className="font-medium mb-2">Admin Test Credentials:</h2>

      <div className="space-y-3">
        <div className="flex items-center justify-between bg-white dark:bg-gray-700 p-2 rounded">
          <span className="text-sm font-mono">
            Email: {adminCredentials.email}
          </span>
          <button
            onClick={() => handleCopy(adminCredentials.email, "email")}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
            aria-label="Copy email"
          >
            <BsCopy className="w-4 h-4" />
            {copied.email && <span className="text-xs ml-1">Copied!</span>}
          </button>
        </div>

        <div className="flex items-center justify-between bg-white dark:bg-gray-700 p-2 rounded">
          <span className="text-sm font-mono">
            Password: {adminCredentials.password}
          </span>
          <button
            onClick={() => handleCopy(adminCredentials.password, "password")}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
            aria-label="Copy password"
          >
            <BsCopy className="w-4 h-4" />
            {copied.password && <span className="text-xs ml-1">Copied!</span>}
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
        Note: These credentials are for testing purposes only.
      </p>
    </div>
  );
}
