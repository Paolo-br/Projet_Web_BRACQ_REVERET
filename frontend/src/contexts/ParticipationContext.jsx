import { createContext, useContext, useState, useCallback } from 'react';

/**
 * Contexte pour gérer l'état global des participations.
 * Permet de notifier l'application lorsque des participations sont modifiées
 * afin de déclencher un rechargement des données.
 */
const ParticipationContext = createContext();

/**
 * Provider du contexte de participation.
 * Enveloppe l'application pour fournir l'accès au contexte.
 */
export function ParticipationProvider({ children }) {
  // Trigger pour forcer le rechargement des participations
  const [participationTrigger, setParticipationTrigger] = useState(0);

  /**
   * Notifie que les participations ont changé et force un rechargement.
   */
  const notifyParticipationChange = useCallback(() => {
    setParticipationTrigger(prev => prev + 1);
  }, []);

  return (
    <ParticipationContext.Provider value={{ participationTrigger, notifyParticipationChange }}>
      {children}
    </ParticipationContext.Provider>
  );
}

/**
 * Hook personnalisé pour accéder au contexte de participation.
 * Doit être utilisé à l'intérieur d'un ParticipationProvider.
 */
export function useParticipation() {
  const context = useContext(ParticipationContext);
  if (!context) {
    throw new Error('useParticipation must be used within a ParticipationProvider');
  }
  return context;
}
