interface ButtonProps {
    variant: 'primary' | 'secondary'| 'close';
    size: 'small' | 'medium' | 'large';
    label: string;
    onClick?: () => void | (() => Promise<void>);
    type?: 'button' | 'submit' | 'reset';

}
const sizeStyles = {
  small: 'px-2 py-1 text-sm',
  medium: 'px-4 py-2 text-base',
  large: 'px-4 py-2 text-md max-h-16 w-full',
};
const variantStyles = {
  primary: 'bg-[#5046e4] text-white hover:bg-[#1f179d]',
  secondary: 'bg-[#e0e7fe] text-black hover:bg-[#d2cff8]',
  close: 'bg-red-500 text-white hover:bg-red-600',
};
const baseStyles = 'cursor-pointer rounded-lg focus:outline-none hover:focus:ring-2 focus:ring-offset-2 focus:ring-[#5046e4]';

export const Button = (props: ButtonProps) => {
  return (
    <button className={`${variantStyles[props.variant]} ${sizeStyles[props.size]} ${baseStyles}`} onClick={props.onClick}>
      {props.label}
    </button>
  );
};