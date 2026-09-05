
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  onClick?: () => void;
}
export function Button({ children, variant = 'primary', onClick }: ButtonProps) {
  const colors = {
    primary: 'bg-purple-600 hover:bg-purple-700',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    danger: 'bg-red-600 hover:bg-red-700'
  };
  return <button className={`${colors[variant]} px-4 py-2 rounded-lg transition text-white`} onClick={onClick}>{children}</button>;
}
