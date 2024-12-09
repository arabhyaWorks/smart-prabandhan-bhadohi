import React from "react";
import { X } from "lucide-react";
import classNames from "classnames";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  title,
}) => {
  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          backdropFilter: "blur(0.5px)",
          margin: 0,
          padding: 0,
        }}
        className={classNames(
          "fixed top-0 inset-0 bg-black bg-opacity-50 transition-opacity z-40",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        style={{
          marginTop: "-10px",
        }}
        className={classNames(
          "fixed inset-y-0 right-0 w-full max-w-3xl bg-white shadow-xl z-50",
          "transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex  items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="h-full overflow-y-auto pb-20">{children}</div>
      </div>
    </>
  );
};

export default Drawer;
