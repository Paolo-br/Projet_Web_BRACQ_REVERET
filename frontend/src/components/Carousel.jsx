import { useState, useRef, useEffect } from 'react';

function Carousel({ title, subtitle, children }) {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 320; // Largeur d'une carte + gap
    const newScrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  // Vérifier au montage si le scroll est nécessaire
  const checkScrollability = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const isScrollable = container.scrollWidth > container.clientWidth;
    setShowRightArrow(isScrollable && container.scrollLeft < container.scrollWidth - container.clientWidth - 10);
  };

  // Utiliser useEffect pour vérifier après le rendu
  useEffect(() => {
    setTimeout(checkScrollability, 100);
  }, [children]);

  return (
    <div style={{ marginBottom: '50px', position: 'relative' }}>
      {/* En-tête */}
      {(title || subtitle) && (
        <div style={{ marginBottom: '20px' }}>
          {title && (
            <h2 style={{ 
              fontSize: '1.8rem', 
              fontWeight: 'bold', 
              margin: '0 0 8px 0',
              color: 'white'
            }}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p style={{ 
              fontSize: '1rem', 
              color: 'white',
              margin: 0 
            }}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Conteneur du carrousel */}
      <div style={{ position: 'relative' }}>
        {/* Flèche gauche */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            style={{
              position: 'absolute',
              left: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '2px solid #fff',
              backgroundColor: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              color: '#333',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f8f8f8';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#fff';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            ‹
          </button>
        )}

        {/* Flèche droite */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            style={{
              position: 'absolute',
              right: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '2px solid #fff',
              backgroundColor: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              color: '#333',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f8f8f8';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#fff';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            ›
          </button>
        )}

        {/* Scroll container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          style={{
            display: 'flex',
            gap: '20px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            paddingBottom: '5px'
          }}
        >
          {children}
        </div>
      </div>

      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default Carousel;
