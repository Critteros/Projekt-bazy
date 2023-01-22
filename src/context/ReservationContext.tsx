import { createContext, type ReactNode, type SetStateAction, useState, type Dispatch } from 'react';

import type { ArrayElement } from '@/utils/types';
import type { NewTransactionRequest } from '@/dto/transaction';

export type ReservationType = ArrayElement<NewTransactionRequest['reservations']>;
export const ReservationContext = createContext<
  [ReservationType[], Dispatch<SetStateAction<ReservationType[]>>] | null
>(null);

export const ReservationContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<ReservationType[]>([]);

  return (
    <ReservationContext.Provider value={[state, setState]}>{children}</ReservationContext.Provider>
  );
};
