import type { AccountRoles } from '@/server/db/tableSchema';
import { intersection } from 'lodash';

export type RoleType = AccountRoles['name'];
export const hasRole = (hasRoles: RoleType[], toMatch: RoleType[] | RoleType) => {
  if (Array.isArray(toMatch)) {
    const intersectionRoles = intersection(hasRoles, toMatch);
    return intersectionRoles.length > 0;
  }
  return hasRoles.includes(toMatch);
};
