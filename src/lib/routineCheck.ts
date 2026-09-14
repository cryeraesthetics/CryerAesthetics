// Ported from the prototype's `routineFlags()` — pairwise active-ingredient
// conflict detection, skin-type cautions, and concern-coverage gaps.
import { ACTIVE_KEYWORDS, CONCERN_GAPS, CONFLICTS, SHELF_ITEMS, TYPE_CAUTIONS } from './data';
import type { RoutineFlag, ShelfEntry } from './types';

export interface RoutineCheckInput {
  shelfPresetIds: string[];
  customProductNames: string[];
  photoNames: string[];
  concernIds: string[];
  skinTypeId: string | null;
}

function resolveTypedName(name: string): ShelfEntry {
  const lower = name.toLowerCase();
  const hit = ACTIVE_KEYWORDS.find((k) => k.match.some((m) => lower.indexOf(m) > -1));
  return hit
    ? { id: 'custom-' + name, name, active: hit.active, activeLabel: hit.activeLabel }
    : { id: 'custom-' + name, name, active: 'unknown', activeLabel: 'Unrecognized' };
}

export function routineFlags(input: RoutineCheckInput): RoutineFlag[] {
  const picked: ShelfEntry[] = SHELF_ITEMS.filter((i) => input.shelfPresetIds.indexOf(i.id) > -1).map((i) => ({ ...i }));
  const typedNames = [...input.customProductNames, ...input.photoNames];
  typedNames.forEach((name) => picked.push(resolveTypedName(name)));

  const out: RoutineFlag[] = [];
  for (let a = 0; a < picked.length; a++) {
    for (let b = a + 1; b < picked.length; b++) {
      const key = [picked[a].active, picked[b].active].sort().join('|');
      const rule = CONFLICTS[key];
      if (rule) {
        out.push({
          id: key + picked[a].id + picked[b].id,
          level: rule.level,
          title: picked[a].activeLabel + ' + ' + picked[b].activeLabel,
          products: picked[a].name + ' · ' + picked[b].name,
          why: rule.why,
          fix: rule.fix,
        });
      }
    }
  }

  const actives = picked.map((p) => p.active);
  const typeRule = input.skinTypeId ? TYPE_CAUTIONS[input.skinTypeId] : undefined;
  if (typeRule) {
    picked.filter((p) => typeRule.actives.indexOf(p.active) > -1).forEach((p) => {
      out.push({
        id: 'type-' + p.id,
        level: 'caution',
        title: p.activeLabel + ' on ' + input.skinTypeId + ' skin',
        products: p.name,
        why: typeRule.why,
        fix: typeRule.fix,
      });
    });
  }

  CONCERN_GAPS.forEach((g) => {
    if (input.concernIds.indexOf(g.concern) > -1 && !g.needs.some((n) => actives.indexOf(n) > -1)) {
      out.push({ id: 'gap-' + g.concern, level: 'gap', title: g.title, products: 'Based on your concerns', why: g.why, fix: g.fix });
    }
  });

  picked.filter((p) => p.active === 'unknown').forEach((p) => {
    out.push({
      id: 'unk-' + p.id,
      level: 'caution',
      title: `Could not read "${p.name}"`,
      products: 'Added by you',
      why: 'The scan matches products by their active ingredient and did not recognize one in this name, so it was left out of the conflict check.',
      fix: 'Rename it to include the active — for example "The Ordinary 10% niacinamide" — or ask about it in your profile notes.',
    });
  });

  return out;
}
