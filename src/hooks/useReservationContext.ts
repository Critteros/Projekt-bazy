import { ReservationContext, ReservationType } from '@/context/ReservationContext';
import { useCallback, useContext } from 'react';

export const useReservationContext = () => {
  const contextValue = useContext(ReservationContext);

  if (contextValue === null) {
    throw new Error('Missing reservation Context');
  }

  const [state, setState] = contextValue;

  const append = useCallback(
    (newElement: ReservationType) => {
      setState((prevState) => [...prevState, newElement]);
    },
    [setState],
  );

  const remove = useCallback(
    (toDelete: ReservationType) => {
      setState((prevState) => [...prevState.filter((el) => el !== toDelete)]);
    },
    [setState],
  );

  return {
    reservations: state,
    append,
    remove,
  };
};
