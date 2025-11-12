/**
 * Composant pour afficher un badge de rôle (USER ou ADMIN)
 * @param {Object} props
 * @param {string} props.role - Le rôle à afficher (USER, ADMIN, etc.)
 * @param {string} [props.size='medium'] - La taille du badge (small, medium, large)
 */
function RoleBadge({ role, size = 'medium' }) {
  const styles = {
    small: {
      padding: '2px 8px',
      fontSize: '0.7rem',
    },
    medium: {
      padding: '4px 12px',
      fontSize: '0.85rem',
    },
    large: {
      padding: '6px 16px',
      fontSize: '1rem',
    },
  };

  const colors = {
    ADMIN: {
      background: '#ff4444',
      color: '#fff',
    },
    USER: {
      background: '#4CAF50',
      color: '#fff',
    },
  };

  const roleColor = colors[role] || colors.USER;
  const sizeStyle = styles[size] || styles.medium;

  const badgeStyle = {
    display: 'inline-block',
    backgroundColor: roleColor.background,
    color: roleColor.color,
    borderRadius: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    ...sizeStyle,
  };

  return (
    <span style={badgeStyle}>
      {role}
    </span>
  );
}

export default RoleBadge;
