// import React from "react";
// import classNames from "classnames";
// // import DatePicker from "react-datepicker";
// import { DatePicker } from "../datePicker/DatePicker";

// interface FormFieldProps {
//   label: string;
//   name: string;
//   type: "text" | "number" | "select" | "textarea" | "date";
//   value: any;
//   onChange: any;
//   placeholder?: string;
//   options?: { value: string; label: string }[];
//   className?: string;
//   required?: boolean;
// }

// const FormField: React.FC<FormFieldProps> = ({
//   label,
//   name,
//   type,
//   value,
//   onChange,
//   placeholder,
//   options,
//   className,
//   required,
// }) => {
//   const baseInputClasses =
//     "w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 hover:bg-white";

//   const formatToDDMMYY = (dateStr) => {
//     const date = new Date(dateStr);
//     if (isNaN(date.getTime())) return ""; // Handle invalid dates
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of year
//     return `${day}-${month}-${year}`;
//   };

//   /**
//    * Helper function to convert dd/MM/yy back to input-compatible format yyyy-MM-dd
//    */
//   const formatToInputDate = (ddmmyy) => {
//     const [day, month, year] = ddmmyy.split("-");
//     if (!day || !month || !year) return ""; // Handle invalid formats
//     return `20${year}-${month}-${day}`; // Reformat to yyyy-MM-dd for input
//   };
//   const renderField = () => {
//     switch (type) {
//       case "select":
//         return (
//           <select
//             name={name}
//             value={value}
//             onChange={onChange}
//             className={classNames(
//               baseInputClasses,
//               "appearance-none bg-no-repeat",
//               {
//                 "text-gray-500": !value,
//               }
//             )}
//             required={required}
//           >
//             <option value="">{placeholder || "Select an option"}</option>
//             {options?.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         );

//       case "textarea":
//         return (
//           <textarea
//             name={name}
//             value={value}
//             onChange={onChange}
//             placeholder={placeholder}
//             className={baseInputClasses}
//             rows={4}
//             required={required}
//           />
//         );

//       case "date":
//         return (
//           // <DatePicker
//           //   selected={value}
//           //   onChange={(date) => onChange(date)}
//           //   className={baseInputClasses}
//           //   dateFormat="dd/MM/yyyy"
//           // />

//           // <DatePicker
//           //   value={value}
//           //   required={required}

//           <input
//             type="date"
//             value={value}
//             onChange={(e) => {
//               console.log("e", e.target.value);
//               onChange(e.target.value);
//             }}
//             name={name}
//             placeholder={placeholder}
//             className={baseInputClasses}
//           />
//         );

//       default:
//         return (
//           <input
//             type={type}
//             name={name}
//             value={value}
//             onChange={onChange}
//             placeholder={placeholder}
//             className={baseInputClasses}
//             required={required}
//           />
//         );
//     }
//   };

//   return (
//     <div className={classNames("space-y-2", className)}>
//       <label className="block text-sm font-medium text-gray-700">
//         {label}
//         {required && <span className="text-red-500 ml-1">*</span>}
//       </label>
//       <div className="relative">
//         {renderField()}
//         <div className="absolute inset-0 rounded-lg pointer-events-none transition-shadow duration-200" />
//       </div>
//     </div>
//   );
// };

// export default FormField;


import React from "react";
import classNames from "classnames";

interface FormFieldProps {
  label: string;
  name: string;
  type: "text" | "number" | "select" | "textarea" | "date";
  value: any;
  onChange: any;
  placeholder?: string;
  options?: { value: string; label: string }[];
  className?: string;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  options,
  className,
  required,
  disabled,
}) => {
  const baseInputClasses =
    "w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 hover:bg-white";

  const renderField = () => {
    switch (type) {
      case "select":
        return (
          <select
            name={name}
            value={value || ""}
            onChange={onChange}
            className={classNames(
              baseInputClasses,
              "appearance-none bg-no-repeat",
              {
                "text-gray-500": !value,
              }
            )}
            required={required}
            disabled={disabled}
          >
            <option value="">{placeholder || "Select an option"}</option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case "textarea":
        return (
          <textarea
            name={name}
            value={value || ""}
            onChange={onChange}
            placeholder={placeholder}
            className={baseInputClasses}
            rows={4}
            required={required}
          />
        );

      case "date":
        return (
          <input
            type="date"
            name={name}
            value={value || ""}
            onChange={(e) => {
              // Ensure value is in yyyy-MM-dd format
              onChange(e.target.value);
            }}
            placeholder={placeholder}
            className={baseInputClasses}
            required={required}
          />
        );

      default:
        return (
          <input
            type={type}
            name={name}
            value={value || ""}
            onChange={onChange}
            placeholder={placeholder}
            className={baseInputClasses}
            required={required}
          />
        );
    }
  };

  return (
    <div className={classNames("space-y-2", className)}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">{renderField()}</div>
    </div>
  );
};

export default FormField;
