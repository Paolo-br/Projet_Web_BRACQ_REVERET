function QuickFilters({ onCategorySelect }) {
  const categories = [
    { value: 'BAR', label: '🍺 Bars', color: '#ff6b6b' },
    { value: 'MUSEE', label: '� Musées', color: '#f06595' },
    { value: 'BOITE_DE_NUIT', label: '� Clubs', color: '#a05fdb' },
    { value: 'PARC', label: '🌳 Parcs', color: '#51cf66' },
    { value: 'BIBLIOTHEQUE', label: '📚 Bibliothèques', color: '#339af0' },
    { value: 'MONUMENT_HISTORIQUE', label: '🏛️ Monuments', color: '#868e96' }
  ];

  return (
    <div style={{
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: '40px',
      padding: '0 20px'
    }}>
      {categories.map(cat => (
        <button
          key={cat.value}
          onClick={() => onCategorySelect(cat.value)}
          style={{
            padding: '12px 24px',
            backgroundColor: cat.color,
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 5px rgba(0,0,0,0.15)';
          }}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

export default QuickFilters;
