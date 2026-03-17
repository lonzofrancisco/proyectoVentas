function SidebarCategories({ categories, setSelectedCategory }) {
  return (
    <div>

      <h2 className="font-bold text-lg mb-4">
        Categorías
      </h2>

      <ul className="space-y-2">

        <li>
          <button
            onClick={() => setSelectedCategory(null)}
            className="w-full text-left p-2 rounded hover:bg-gray-100"
          >
            Todas
          </button>
        </li>

        {categories.map((cat) => (
          <li key={cat.id}>
            <button
              onClick={() => setSelectedCategory(cat.id)}
              className="w-full text-left p-2 rounded hover:bg-gray-100"
            >
              {cat.name}
            </button>
          </li>
        ))}

      </ul>

    </div>
  );
}

export default SidebarCategories;