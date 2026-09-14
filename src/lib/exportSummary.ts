import { CONCERNS, SHELF_ITEMS, SKIN_TYPES } from './data';
import { prettyTime } from './time';
import type { ProfileState, DiaryEntry, ShelfCustomItem, ShelfPhotoItem } from '../context/MemberDataContext';
import type { RoutineFlag } from './types';

function esc(v: unknown): string {
  return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function buildSkinSummaryHtml(params: {
  profile: ProfileState;
  shelfPresetIds: string[];
  customProducts: ShelfCustomItem[];
  photoItems: ShelfPhotoItem[];
  flags: RoutineFlag[];
  diary: DiaryEntry[];
}): string {
  const { profile, shelfPresetIds, customProducts, photoItems, flags, diary } = params;
  const type = SKIN_TYPES.find((t) => t.id === profile.skinType)?.name ?? '—';
  const concerns = CONCERNS.filter((c) => profile.concerns.includes(c.id)).map((c) => c.label).concat(profile.customConcerns);
  const products = SHELF_ITEMS.filter((i) => shelfPresetIds.includes(i.id)).map((i) => `${i.name} — ${i.activeLabel}`)
    .concat(customProducts.map((p) => p.name))
    .concat(photoItems.filter((p) => p.name).map((p) => p.name));
  const today = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

  const list = (arr: string[], empty: string) =>
    arr.length ? `<ul>${arr.map((v) => `<li>${esc(v)}</li>`).join('')}</ul>` : `<p class="muted">${empty}</p>`;

  const diaryRows = diary.map((d) => {
    const sym = Object.entries(d.symptoms).map(([k, v]) => `${k} ${v}/3`).join(', ');
    return `<tr><td>${esc(d.date)}</td><td>${esc(sym)}</td><td>${esc(d.note || '')}</td></tr>`;
  }).join('');

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Skin summary${profile.name ? ' — ' + esc(profile.name) : ''}</title><style>
@page{margin:18mm}
body{font:12pt/1.55 Georgia,serif;color:#201e1d;max-width:46em;margin:0 auto;padding:24px}
h1{font-size:20pt;margin:0 0 2px}h2{font-size:12pt;text-transform:uppercase;letter-spacing:.08em;margin:26px 0 6px;border-bottom:1px solid #ccc;padding-bottom:4px}
.meta{font-size:10pt;color:#666;margin:0 0 6px}ul{margin:4px 0 0;padding-left:20px}li{margin-bottom:3px}
.muted{color:#777}table{width:100%;border-collapse:collapse;font-size:10.5pt;margin-top:6px}
th,td{text-align:left;vertical-align:top;border-bottom:1px solid #ddd;padding:5px 6px}
.flag{margin:8px 0;padding-left:10px;border-left:2px solid #c67139}.flag b{display:block}
.note{white-space:pre-wrap}
</style></head><body>
<h1>Skin summary${profile.name ? ' — ' + esc(profile.name) : ''}</h1>
<p class="meta">Prepared ${esc(today)} · Cryer Aesthetics app · Self-reported guidance, not a diagnosis or a medical record</p>
<h2>Skin type</h2><p>${esc(type)}</p>
<h2>Concerns</h2>${list(concerns, 'None recorded.')}
<h2>Products in use</h2>${list(products, 'None recorded.')}
<h2>Routine timing</h2><ul><li>AM routine: ${esc(prettyTime(profile.amTime).replace('Every day at ', ''))}${profile.remindAm ? '' : ' (reminder off)'}</li><li>PM routine: ${esc(prettyTime(profile.pmTime).replace('Every day at ', ''))}${profile.remindPm ? '' : ' (reminder off)'}</li></ul>
<h2>Flagged interactions</h2>${flags.length ? flags.map((f) => `<div class="flag"><b>${esc(f.title)}</b>${esc(f.why)} <i>${esc(f.fix)}</i></div>`).join('') : '<p class="muted">Nothing flagged.</p>'}
<h2>Diary history</h2>${diaryRows ? `<table><tr><th>Date</th><th>Symptoms (0–4)</th><th>Note</th></tr>${diaryRows}</table>` : '<p class="muted">No entries logged.</p>'}
<h2>Notes from the client</h2><p class="note">${profile.notes ? esc(profile.notes) : '<span class="muted">None.</span>'}</p>
</body></html>`;
}

export function exportSkinSummary(html: string) {
  const w = window.open('', '_blank');
  if (!w) return;
  w.document.open();
  w.document.write(html);
  w.document.close();
  setTimeout(() => { try { w.focus(); w.print(); } catch { /* noop */ } }, 350);
}
