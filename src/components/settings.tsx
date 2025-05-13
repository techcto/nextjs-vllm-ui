
"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import ClearChatsButton from "./settings-clear-chats";
import SettingsThemeToggle from "./settings-theme-toggle";
import SystemPrompt, { SystemPromptProps } from "./system-prompt";

export default function SettingsContainer({ chatOptions, setChatOptions }: SystemPromptProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSamplingOpen, setIsSamplingOpen] = useState(false);

  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 m-0">
      <div className="border border-transparent rounded-lg p-0.5 m-0">
        <SystemPrompt chatOptions={chatOptions} setChatOptions={setChatOptions} />
        <div className="accordion accordion-flush p-0 m-0" id="accordionFlushExample">
          {/* Settings Section */}
          <div className="accordion-item border-t p-0 m-0">
            <div
              className="accordion-header p-0 m-0 text-sm font-semibold cursor-pointer flex justify-between items-center"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
              <h3 className="text-lg font-semibold">Settings</h3>
              <span>
                {isSettingsOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </span>
            </div>
            {isSettingsOpen && (
              <div className="accordion-body p-0 m-0">
                {/* Temperature */}
                <div className="flex items-center gap-4 p-0 m-0">
                  <label className="text-sm font-medium w-1/3 p-0 m-0">Temperature</label>
                  <div className="flex items-center justify-end w-2/3 p-0 m-0">
                    <Button
                      onClick={() => setChatOptions({ ...chatOptions, temperature: 1 })}
                      variant="ghost"
                      size="iconSm"
                      className="text-gray-500 hover:text-gray-700 p-0 m-0 mr-[-1px]"
                    >
                      <Trash2 className="w-4 h-4 p-0 m-0" />
                    </Button>
                    <Input
                      type="number"
                      value={chatOptions.temperature}
                      onChange={(e) =>
                        setChatOptions({ ...chatOptions, temperature: parseFloat(e.target.value) })
                      }
                      min={0}
                      max={2}
                      step={0.1}
                      className="w-16 p-1"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={2}
                  step={0.1}
                  value={chatOptions.temperature}
                  onChange={(e) =>
                    setChatOptions({ ...chatOptions, temperature: parseFloat(e.target.value) })
                  }
                  className="w-full accent-gray-500 m-0 p-0"
                />

                {/* Max Tokens */}
                <div className="flex items-center gap-4 mt-4 p-0 m-0">
                  <label className="text-sm font-medium w-1/3 p-0 m-0">Limit Response Length</label>
                  <div className="flex items-center justify-end w-2/3 p-0 m-0">
                    <Button
                      onClick={() => setChatOptions({ ...chatOptions, maxTokens: 1 })}
                      variant="ghost"
                      size="iconSm"
                      className="text-gray-500 hover:text-gray-700 p-0 m-0 mr-[-1px]"
                    >
                      <Trash2 className="w-4 h-4 p-0 m-0" />
                    </Button>
                    <Input
                      type="number"
                      value={chatOptions.maxTokens}
                      onChange={(e) =>
                        setChatOptions({
                          ...chatOptions,
                          maxTokens: parseInt(e.target.value, 10) || 1,
                        })
                      }
                      min={1}
                      max={4096}
                      className="w-16 p-1"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={1}
                  max={4096}
                  step={10}
                  value={chatOptions.maxTokens}
                  onChange={(e) =>
                    setChatOptions({
                      ...chatOptions,
                      maxTokens: parseInt(e.target.value, 10) || 1,
                    })
                  }
                  className="w-full accent-gray-500 m-0 p-0"
                />
              </div>
            )}
          </div>

          {/* Sampling Section */}
          <div className="accordion-item border-t p-0 m-0">
            <div
              className="accordion-header p-0 m-0 text-sm font-semibold cursor-pointer flex justify-between items-center"
              onClick={() => setIsSamplingOpen(!isSamplingOpen)}
            >
              <h3 className="text-lg font-semibold">Sampling</h3>
              <span>
                {isSamplingOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </span>
            </div>
            {isSamplingOpen && (
              <div className="accordion-body p-0 m-0">
                {/* Top K */}
                <div className="flex items-center gap-4 p-0 m-0">
                  <label className="text-sm font-medium w-1/3 p-0 m-0">Top K Sampling</label>
                  <div className="flex items-center justify-end w-2/3 p-0 m-0">
                    <Button
                      onClick={() => setChatOptions({ ...chatOptions, topK: 0 })}
                      variant="ghost"
                      size="iconSm"
                      className="text-gray-500 hover:text-gray-700 p-0 m-0 mr-[-1px]"
                    >
                      <Trash2 className="w-4 h-4 p-0 m-0" />
                    </Button>
                    <Input
                      type="number"
                      value={chatOptions.topK}
                      onChange={(e) =>
                        setChatOptions({
                          ...chatOptions,
                          topK: parseInt(e.target.value, 10) || 0,
                        })
                      }
                      min={0}
                      className="w-16 p-1"
                    />
                  </div>
                </div>

                {/* Top P */}
                <div className="flex items-center gap-4 mt-4 p-0 m-0">
                  <label className="text-sm font-medium w-1/3 p-0 m-0">Top P Sampling</label>
                  <div className="flex items-center justify-end w-2/3 p-0 m-0">
                    <Button
                      onClick={() => setChatOptions({ ...chatOptions, topP: 0.95 })}
                      variant="ghost"
                      size="iconSm"
                      className="text-gray-500 hover:text-gray-700 p-0 m-0 mr-[-1px]"
                    >
                      <Trash2 className="w-4 h-4 p-0 m-0" />
                    </Button>
                    <Input
                      type="number"
                      value={chatOptions.topP}
                      onChange={(e) =>
                        setChatOptions({
                          ...chatOptions,
                          topP: parseFloat(e.target.value) || 0,
                        })
                      }
                      min={0}
                      max={1}
                      step={0.01}
                      className="w-16 p-1"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={chatOptions.topP}
                  onChange={(e) =>
                    setChatOptions({
                      ...chatOptions,
                      topP: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full accent-gray-500 m-0 p-0"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Clear Chats & System Toggle */}
      <div className="pt-4 border-t border-gray-300 dark:border-gray-700 p-0 m-0">
        <div className="flex flex-col items-start gap-2 p-0 m-0">
          <h3 className="text-lg font-semibold">Clear Chats</h3>
          <ClearChatsButton />
        </div>

        <div className="mt-4 flex flex-col items-start gap-2 p-0 m-0">
          <h3 className="text-lg font-semibold">System Toggle</h3>
          <SettingsThemeToggle />
        </div>
      </div>
    </div>
  );
}
