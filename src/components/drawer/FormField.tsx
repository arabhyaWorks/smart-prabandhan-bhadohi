import React from 'react';
import classNames from 'classnames';
import DatePicker from 'react-datepicker';

interface FormFieldProps {
  label: string;
  name: string;
  type: 'text' | 'number' | 'select' | 'textarea' | 'date';
  value: any;
  onChange: (e: any) => void;
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
  required
}) => {
  const baseInputClasses = "w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 hover:bg-white";

  const renderField = () => {
    switch (type) {
      case 'select':
        return (
          <select
            name={name}
            value={value}
            onChange={onChange}
            className={classNames(baseInputClasses, "appearance-none bg-no-repeat", {
              "text-gray-500": !value
            })}
            required={required}
          >
            <option value="">{placeholder || 'Select an option'}</option>
            {options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'textarea':
        return (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={baseInputClasses}
            rows={4}
            required={required}
          />
        );
      
      case 'date':
        return (
          <DatePicker
            selected={value}
            onChange={(date) => onChange(date)}
            className={baseInputClasses}
            dateFormat="dd/MM/yyyy"
            placeholderText={placeholder}
            required={required}
          />
        );
      
      default:
        return (
          <input
            type={type}
            name={name}
            value={value}
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
      <div className="relative">
        {renderField()}
        <div className="absolute inset-0 rounded-lg pointer-events-none transition-shadow duration-200" />
      </div>
    </div>
  );
};

export default FormField;