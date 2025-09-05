export default function Card({ title, children }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {children}
    </div>
  );
}
