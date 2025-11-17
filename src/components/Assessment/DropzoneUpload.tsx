import { cn } from "@heroui/theme";
import React, { useRef, useState } from "react";

type DropzoneProps = {
  onFileAccepted?: (file: File | null) => void;
  className?: string;
};

const MAX_BYTES = 2 * 1024 * 1024; // 2 MB

export const DropzoneUpload = ({
  onFileAccepted,
  className,
}: DropzoneProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [, setFileObj] = useState<File | null>(null);

  function handleFiles(files: FileList | null) {
    setError(null);
    if (!files || files.length === 0) {
      return;
    }
    const file = files[0];

    const isSupportedFormat =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf") ||
      file.type === "application/docs" ||
      file.name.toLowerCase().endsWith(".doc") ||
      file.type === "application/txt" ||
      file.name.toLowerCase().endsWith(".txt") ||
      file.type === "application/md" ||
      file.name.toLowerCase().endsWith(".md");

    if (!isSupportedFormat) {
      setError("Only PDF/TXT/DOCS/MD files are allowed.");
      setFileObj(null);
      setFileName(null);
      if (onFileAccepted) onFileAccepted(null);
      return;
    }

    if (file.size > MAX_BYTES) {
      setError("File is too large. Maximum allowed size is 2 MB.");
      setFileObj(null);
      setFileName(null);
      if (onFileAccepted) onFileAccepted(null);
      return;
    }

    setFileName(file.name);
    setFileObj(file);
    setError(null);
    if (onFileAccepted) onFileAccepted(file);
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };

  const removeFile = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFileName(null);
    setFileObj(null);
    setError(null);
    if (onFileAccepted) onFileAccepted(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className={`w-full ${className ?? ""}`}>
      {fileName ? (
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current && inputRef.current.click()}
          onKeyDown={(e) =>
            e.key === "Enter" && inputRef.current && inputRef.current.click()
          }
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          
          className={cn(
            "p-4",
            "border-2 border-purple-400 rounded-xl",
            "text-center cursor-pointer",
            "transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-300",
            dragOver
              ? "bg-indigo-50/40 shadow-lg border-indigo-300"
              : "bg-white "
          )}
        >
          <div className="text-sm text-gray-600 flex items-center justify-between gap-3">
            <div className="flex items-col">
              <div className="rounded-full bg-indigo-50 mr-4 w-8 h-8 px-2 py-1">
                <img src="/icons/pdf_icon.svg" alt="pdf_icon" className="w-4 h-4 inline mr-2" />
              </div>
              <span className="font-medium flex items-center">{fileName}</span>
            </div>
              <img src="/icons/delete_purple.svg" alt="delete_purple" onClick={removeFile} className="w-5 h-6 hover:bg-gray-50" />
          </div>
        </div>
      ) 
      : (
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current && inputRef.current.click()}
          onKeyDown={(e) =>
            e.key === "Enter" && inputRef.current && inputRef.current.click()
          }
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          className={cn(
            "p-6 md:p-10",
            "border-2 border-dashed rounded-2xl",
            "text-center cursor-pointer",
            "transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-300",
            dragOver
              ? "bg-indigo-50/40 shadow-lg border-indigo-300"
              : "bg-white border-gray-200"
          )}
        >
          <div className="flex flex-col items-center">
            <div className="p-3 rounded-full bg-indigo-50 mb-2">
              <img
                src="/icons/file_upload_arrow.svg"
                alt="file_upload_arrow"
                className="w-6 h-6"
              />
            </div>

            <p className="text-lg md:text-xl text-gray-700">
              <span className="text-indigo-600 font-semibold">Click here</span>
              <span className="ml-2">to upload your job description</span>
            </p>

            <p className="text-sm text-gray-400 mt-1">
              Supported Format: PDF, TXT, Docs, MD (up to 2MB)
            </p>
          </div>

          {error && <div className="mt-2 text-sm text-red-600">{error}</div>}

          <input
            ref={inputRef}
            type="file"
            accept="application/pdf,.pdf, .txt, .docs, .md"
            onChange={onInputChange}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};
