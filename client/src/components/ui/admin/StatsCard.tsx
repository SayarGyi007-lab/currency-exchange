type Props = {
  title: string;
  value: string | number;
  highlight?: boolean;
};

const StatCard = ({ title, value, highlight = false }: Props) => {
  return (
    <div
      className={`p-6 rounded-2xl border shadow-sm transition-all ${
        highlight
          ? "bg-yellow-50 border-yellow-300"
          : "bg-white border-gray-200"
      }`}
    >
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold mt-2 text-gray-900">{value}</h2>
    </div>
  );
};

export default StatCard;