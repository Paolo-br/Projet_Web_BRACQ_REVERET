import { createContext, useContext, useState, useCallback } from 'react';

const ParticipationContext = createContext();

export function ParticipationProvider({ children }) {
  // Trigger pour forcer le rechargement des participations
  const [participationTrigger, setParticipationTrigger] = useState(0);

  // Fonction pour notifier qu'une participation a changé
  const notifyParticipationChange = useCallback(() => {
    setParticipationTrigger(prev => prev + 1);
  }, []);

  return (
    <ParticipationContext.Provider value={{ participationTrigger, notifyParticipationChange }}>
      {children}
    </ParticipationContext.Provider>
  );
}

export function useParticipation() {
  const context = useContext(ParticipationContext);
  if (!context) {
    throw new Error('useParticipation must be used within a ParticipationProvider');
  }
  return context;
}
