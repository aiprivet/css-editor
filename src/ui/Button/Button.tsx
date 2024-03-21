interface ButtonProps {
  type: string;
  children: React.ReactNode;
  onClick?: () => void;
}
export default function Button({ type, children, onClick }: ButtonProps) {
  const colorTypes = {
    success: "from-green-400 via-green-500 to-green-600",
    danger: "from-red-400 via-red-500 to-red-600",
    primary: "from-blue-500 via-blue-600 to-blue-700",
  };

  return (
    <button
      onClick={onClick}
      type="submit"
      className={`text-white px-4 py-2 rounded-lg text-xs bg-gradient-to-r ${colorTypes[type]} hover:bg-gradient-to-br transition`}
    >
      {children}
    </button>
  );
}
