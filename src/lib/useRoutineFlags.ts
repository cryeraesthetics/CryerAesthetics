import { useMemo } from 'react';
import { useMemberData } from '../context/MemberDataContext';
import { routineFlags } from './routineCheck';

export function useRoutineFlags() {
  const { shelfPresetIds, customProducts, photoItems, profile } = useMemberData();
  return useMemo(
    () =>
      routineFlags({
        shelfPresetIds,
        customProductNames: customProducts.map((p) => p.name),
        photoNames: photoItems.filter((p) => p.name && !p.reading).map((p) => p.name),
        concernIds: [...profile.concerns],
        skinTypeId: profile.skinType,
      }),
    [shelfPresetIds, customProducts, photoItems, profile.concerns, profile.skinType],
  );
}
