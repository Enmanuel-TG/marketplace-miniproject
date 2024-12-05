import { forwardRef } from 'react';

interface TextareaProps
  extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  fieldname?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ fieldname, required, ...props }, ref) => {
  return (
    <label className="flex flex-col px-1">
      <span className="mb-1 cursor-pointer">
        {fieldname}{' '}
        {required && (
          <span className="text-red-500" title={`The ${fieldname} is required.`}>
            *
          </span>
        )}
      </span>
      <textarea
        required={required}
        ref={ref}
        {...props}
        className={`w-full min-h-[100px] p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${props.className}`}
      />
    </label>
  );
});
Textarea.displayName = 'Textarea';

export default Textarea;
