"use client";
import { useState, ReactNode } from "react";

interface AccordionProps {
  title: string;
  children: ReactNode;
}
export default function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm font-semibold cursor-pointer flex justify-between items-center w-full text-left py-2"
      >
        <span>{title}</span>
        <span className="text-lg">{isOpen ? "˄" : "v"}</span>
      </button>
      {isOpen && <div className="mt-2">{children}</div>}
    </div>
  );
}
