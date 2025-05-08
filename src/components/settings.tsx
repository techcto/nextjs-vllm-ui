
"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button"; 
import { Trash2 } from "lucide-react";
import ClearChatsButton from "./settings-clear-chats";
import SettingsThemeToggle from "./settings-theme-toggle";
import SystemPrompt, { SystemPromptProps } from "./system-prompt";

const TemperatureSlider = ({ chatOptions, setChatOptions }: SystemPromptProps) => {
  const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatOptions({ ...chatOptions, temperature: parseFloat(e.target.value) });
  };

  return (
    <div className="p-2">
      <div className="mx-2 flex items-center justify-between gap-4">
        <label htmlFor="small-input" className="text-xs font-medium text-gray-900 dark:text-white">
          Temperature
        </label>
        <Input
          type="number"
          inputMode="decimal"
          pattern="^\d*(\.\d+)?$"
          id="small-input"
          className="w-1/4 text-gray-900 hover:border hover:border-gray-300 rounded-sm hover:bg-gray-200 text-xs 
          focus:ring-blue-500 focus:border-blue-500 dark:hover:bg-gray-700 dark:hover:border-gray-600 
          dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-6 text-right
          [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
          [appearance:textfield]"
          value={chatOptions.temperature}
          onChange={handleTemperatureChange}
          min={0}
          max={2}
          step={0.1}
        />
      </div>
      <div className="p-2">
        <input
          id="labels-range-input"
          type="range"
          value={chatOptions.temperature}
          onChange={handleTemperatureChange}
          min="0.0"
          max="2.0"
          step="0.1"
          className="w-full h-1 bg-gray-200 rounded-sm appearance-none cursor-pointer range-sm dark:bg-gray-700"
        />
      </div>
    </div>
  );
};
const LimitResponseLength = ({ chatOptions, setChatOptions }: SystemPromptProps) => {
  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatOptions({ ...chatOptions, maxTokens: parseInt(e.target.value, 10)|| 1});
  };
  const handleReset = () => {
    setChatOptions({ ...chatOptions, maxTokens: 1});
  };
  return (
    <div className="p-2">
      <div className="mx-2 mb-2 flex items-center justify-between gap-4">
        <label
          htmlFor="limit-input"
          className="text-xs font-medium text-gray-900 dark:text-white"
        >
          Limit Response Length
        </label>
        <Button
          onClick={handleReset}
          variant="destructive"
          size="iconSm"
          className="h-6 w-6 p-0"
          aria-label="Reset token limit"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          id="limit-input"
          className="w-1/4 h-6 text-right text-xs text-gray-900 hover:border hover:border-gray-300 rounded-sm hover:bg-gray-200 
          focus:ring-blue-500 focus:border-blue-500 dark:hover:bg-gray-700 dark:hover:border-gray-600 
          dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
          [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
          [appearance:textfield]"
          value={chatOptions.maxTokens}
          onChange={handleLimitChange}
          min={0}
          max={4096}
        />
      </div>
      <input
        type="range"
        min={1}
        max={4096}
        step={10}
        value={chatOptions.maxTokens}
        onChange={handleLimitChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
      <div className="mt-1 text-xs text-gray-600 dark:text-gray-300 text-right">
        {chatOptions.maxTokens } tokens 
      </div>
    </div>
  );
};
const TopPSlider = ({ chatOptions, setChatOptions }: SystemPromptProps) => {
  const handleTopPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 1) {
      setChatOptions({ ...chatOptions, topP: value});
    }
  };

  const handleReset = () => {
    setChatOptions({ ...chatOptions, topP: 0.95 });
  };
  return (
    <div className="space-y-2">
      <div className="mx-2 flex items-center justify-between gap-4">
        <label htmlFor="top-p" className="text-xs font-medium text-gray-900 dark:text-white">
          Top P Sampling
        </label>
        <Input
          type="number"
          inputMode="decimal"
          pattern="^\d*(\.\d+)?$"
          id="top-p"
          className="w-1/4 h-6 text-right text-xs text-gray-900 dark:text-white rounded-sm 
            hover:border hover:border-gray-300 hover:bg-gray-200 focus:ring-blue-500 focus:border-blue-500 
            dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 
            [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none 
            [appearance:textfield]"
          value={chatOptions.topP || ""}
          onChange={handleTopPChange}
          min={0}
          max={1}
          step={0.01}
          placeholder="0.95"
        />
      </div>
      <div className="mx-2">
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={chatOptions.topP}
          onChange={handleTopPChange}
          className="w-full h-1 bg-gray-200 rounded-sm appearance-none cursor-pointer range-sm dark:bg-gray-700"
        />
      </div>
      <div className="mt-1 text-xs text-gray-600 dark:text-gray-300 text-right">
        {chatOptions.topP} 
      </div>
    </div>
  );
};
export default function SettingsContainer({ chatOptions, setChatOptions }: SystemPromptProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSamplingOpen, setIsSamplingOpen] = useState(false);

  return (
    <div className="border border-gray-300 rounded-lg p-2">
      {/* System Prompt */}
      <SystemPrompt chatOptions={chatOptions} setChatOptions={setChatOptions} />
      
      {/* Settings: Temperature + Max Tokens */}
      <button
        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        className="text-lg font-bold cursor-pointer flex justify-between items-center w-full text-right"
      >
        <span>Settings</span>
        <span>{isSettingsOpen ? "v" : "˄"}</span>
      </button>
      {isSettingsOpen && (
        <div className="mt-2 space-y-2">
          <TemperatureSlider chatOptions={chatOptions} setChatOptions={setChatOptions} />
          <LimitResponseLength chatOptions={chatOptions} setChatOptions={setChatOptions} />
        </div>
      )}
      {/* Sampling Settings */}
      <button
        onClick={() => setIsSamplingOpen(!isSamplingOpen)}
        className="text-lg font-bold cursor-pointer flex justify-between items-center w-full text-right"
      >
        <span>Sampling</span>
        <span>{isSamplingOpen ? "v" : "˄"}</span>
      </button>
      {isSamplingOpen && (
        <div className="mt-2 space-y-2">
          <div className="mx-2 flex items-center justify-between gap-4">
            <label htmlFor="top-k" className="text-xs font-medium text-gray-900 dark:text-white">
              Top K Sampling
            </label>
            <Button
                onClick={() => setChatOptions({ ...chatOptions, topK: 0})}
                variant="destructive"
                size="iconSm"
                className="h-6 w-6 p-0"
                aria-label="Reset Top K"
              >
              <Trash2 className="h-4 w-4" />
              </Button>
            <Input
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              id="top-k"
              className="w-1/4 h-6 text-right text-xs text-gray-900 hover:border hover:border-gray-300 rounded-sm hover:bg-gray-200 
              focus:ring-blue-500 focus:border-blue-500 dark:hover:bg-gray-700 dark:hover:border-gray-600 
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
              [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
              [appearance:textfield]"
              value={chatOptions.topK}
              onChange={(e) => setChatOptions({ ...chatOptions, topK: parseInt(e.target.value, 10) })}
              min={0}
            />
          </div>
          <TopPSlider chatOptions={chatOptions} setChatOptions={setChatOptions} />
        </div>
      )}
      {/* Clear & Theme */}
      <div className="mt-4">
        <ClearChatsButton />
      </div>
      <div className="mt-2">
        <SettingsThemeToggle />
      </div>
    </div>
  );
}