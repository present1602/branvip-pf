interface RadioButtonProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export function RadioButton(props: RadioButtonProps) {
  return (
    <div className="relative h-6 w-6 overflow-hidden">
      <input
        {...props}
        type="radio"
        className="
          peer h-full w-full appearance-none rounded-full bg-white ring-1 ring-inset ring-surface-300
          checked:ring-primary-500 hover:bg-primary-50 checked:hover:bg-white checked:hover:ring-primary-600
        "
      />
      <div
        className="
          pointer-events-none absolute inset-0 m-auto hidden h-3 w-3 rounded-full bg-primary-500 
          peer-checked:block peer-hover:bg-primary-600
        "
      />
    </div>
  );
}
