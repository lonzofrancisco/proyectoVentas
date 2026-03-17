export default function Sidebar({ categories }) {
  return (
    <div>
      <h2 className="font-bold text-lg mb-3">Categorías</h2>

      <ul className="space-y-2">
        {categories.map((c) => (
          <li key={c.id}>
            <button className="w-full text-left hover:bg-gray-100 p-2 rounded">
              {c.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}