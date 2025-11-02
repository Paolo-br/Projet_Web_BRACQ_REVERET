function QuickFilters({ places = [], selectedCategory = '', onCategorySelect }) {
  const categories = [
    { value: 'BAR', label: '🍺 Bars', color: '#ff6b6b' },
    { value: 'MUSEE', label: '🎨 Musées', color: '#f06595' },
    { value: 'BOITE_DE_NUIT', label: '🎵 Boîtes de nuit', color: '#a05fdb' },
    { value: 'PARC', label: '🌳 Parcs', color: '#51cf66' },
    { value: 'BIBLIOTHEQUE', label: '📚 Bibliothèques', color: '#339af0' },
    { value: 'MONUMENT_HISTORIQUE', label: '🏛️ Monuments', color: '#868e96' }
  ];

  const countFor = (value) => places.filter(p => p.category === value).length;
  const total = places.length;

  return (
    <div style={{
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: '40px',
      padding: '0 20px'
    }}>
      {/* Bouton Tous les lieux */}
      <button
        onClick={() => onCategorySelect('')}
        style={{
          padding: '10px 20px',
          backgroundColor: selectedCategory === '' ? '#007bff' : '#e9ecef',
          color: selectedCategory === '' ? 'white' : '#495057',
          border: 'none',
          borderRadius: '8px',
          fontSize: '0.95rem',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.2s',
          boxShadow: selectedCategory === '' ? '0 2px 8px rgba(0,123,255,0.3)' : '0 2px 5px rgba(0,0,0,0.1)'
        }}
      >
        Tous les lieux ({total})
      </button>

      {categories.map(cat => (
        <button
          key={cat.value}
          onClick={() => onCategorySelect(cat.value)}
          style={{
            padding: '10px 20px',
            backgroundColor: selectedCategory === cat.value ? cat.color : '#e9ecef',
            color: selectedCategory === cat.value ? 'white' : '#495057',
            border: 'none',
            borderRadius: '8px',
            fontSize: '0.95rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: selectedCategory === cat.value ? `0 2px 8px rgba(0,0,0,0.12)` : '0 2px 5px rgba(0,0,0,0.1)'
          }}
          onMouseEnter={(e) => {
            if (selectedCategory !== cat.value) e.target.style.backgroundColor = '#dee2e6';
          }}
          onMouseLeave={(e) => {
            if (selectedCategory !== cat.value) e.target.style.backgroundColor = '#e9ecef';
          }}
        >
          {cat.label} ({countFor(cat.value)})
        </button>
      ))}
    </div>
  );
}

export default QuickFilters;
