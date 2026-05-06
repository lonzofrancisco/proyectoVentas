function BurgerCategoryTabs({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <div className="w-full bg-gradient-to-r from-orange-600 to-red-600 sticky top-0 z-40 shadow-lg">
      <div className="flex overflow-x-auto p-0 max-w-full">
        
        {/* Botón "Todos" */}
        <button
          onClick={() => setSelectedCategory(null)}
          className={`flex-shrink-0 px-6 py-4 font-semibold whitespace-nowrap transition-all ${
            selectedCategory === null
              ? 'bg-white text-orange-600 border-b-4 border-orange-600'
              : 'text-white hover:bg-red-700'
          }`}
        >
          🍔 Todos
        </button>

        {/* Categorías */}
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex-shrink-0 px-6 py-4 font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-white text-orange-600 border-b-4 border-orange-600'
                : 'text-white hover:bg-red-700'
            }`}
          >
            {cat.name}
          </button>
        ))}

      </div>
    </div>
  );
}

export default BurgerCategoryTabs;
