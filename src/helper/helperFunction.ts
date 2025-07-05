export const getInitial = (name: string | undefined | null): string => {
  if (!name) return "U";
  const words = name.trim().split(/\s+/);
  const initials = words.slice(0, 2).map(word => word.charAt(0).toUpperCase()).join("");
  return initials || "U";
};


export const getIndicatorColorClass = (color: string) => {
  switch (color) {
    case "red": return "bg-red-500 border-red-500";
    case "blue": return "bg-blue-500 border-blue-500";
    case "green": return "bg-green-500 border-green-500";
    default: return "bg-gray-400 border-gray-400";
  }
}

export const getColorClass = (color?: string) => {
  switch (color) {
    case "red": return "bg-red-500";
    case "blue": return "bg-blue-500";
    case "green": return "bg-green-500";
    default: return "bg-gray-400";
  }
};
