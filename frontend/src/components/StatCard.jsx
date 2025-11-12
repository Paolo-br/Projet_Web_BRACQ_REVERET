/**
 * Composant de carte de statistique
 * @param {Object} props
 * @param {string} props.title - Titre de la statistique
 * @param {number|string} props.value - Valeur à afficher
 * @param {string} props.icon - Emoji ou icône
 * @param {string} [props.color='#646cff'] - Couleur de fond
 */
function StatCard({ title, value, icon, color = '#646cff' }) {
  return (
    <div style={{
      padding: '20px',
      backgroundColor: color,
      color: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s, box-shadow 0.3s',
      cursor: 'default',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.2)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    }}
    >
      <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{icon}</div>
      <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '5px' }}>{value}</div>
      <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>{title}</div>
    </div>
  );
}

export default StatCard;
