import { useState } from 'react';
import { useMemberData } from '../../context/MemberDataContext';

export default function ShelfTab() {
  const { customProducts, addCustomProduct, removeCustomProduct, photoItems, addPhotoProduct, renamePhotoProduct, removePhotoProduct } = useMemberData();
  const [productInput, setProductInput] = useState('');

  const submit = () => {
    addCustomProduct(productInput);
    setProductInput('');
  };

  const shelfCount = customProducts.length + photoItems.length;

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10, marginBottom: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-accent-2-700)', textTransform: 'uppercase', letterSpacing: '.03em', whiteSpace: 'nowrap' }}>My shelf</div>
        <span className="muted" style={{ fontSize: 11.5, whiteSpace: 'nowrap' }}>{shelfCount} products</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 20 }}>
        <div style={{ padding: '12px 13px', borderRadius: 'var(--radius-lg)', background: 'var(--color-neutral-100)' }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--color-text)', marginBottom: 4 }}>What this section is for</div>
          <p style={{ fontSize: 12, lineHeight: 1.55, color: 'color-mix(in srgb, var(--color-text) 72%, transparent)', margin: 0 }}>
            List everything you actually put on your skin — cleansers, serums, treatments, SPF — whatever the brand. Type the name or photograph the bottle. The routine check reads the active ingredients behind what you list and tells you what shouldn't be layered together, which is why it only works if the list matches your real shelf. This is guidance, not a diagnosis.
          </p>
        </div>

        {customProducts.map((xp) => (
          <div
            key={xp.id}
            onClick={() => removeCustomProduct(xp.id)}
            style={{ cursor: 'pointer', padding: '10px 13px', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--color-accent-2-700)', background: 'var(--color-accent-2-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}
          >
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--color-text)' }}>{xp.name}</div>
              <div className="muted" style={{ fontSize: 11, marginTop: 1 }}>Added by you</div>
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-accent-2-700)', flex: 'none' }}>×</span>
          </div>
        ))}

        {photoItems.map((pr) => (
          <div key={pr.id} style={{ padding: '10px 12px', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--color-accent-2-700)', background: 'var(--color-accent-2-100)', display: 'flex', gap: 10, alignItems: 'center' }}>
            {pr.photoUrl && (
              <div style={{ width: 46, height: 46, borderRadius: 10, flex: 'none', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url("${pr.photoUrl}")` }} />
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <input
                className="input" type="text" placeholder="Product name" value={pr.name}
                onChange={(e) => renamePhotoProduct(pr.id, e.target.value)}
                style={{ width: '100%', boxSizing: 'border-box', padding: '6px 10px', fontSize: 12 }}
              />
              <div className="muted" style={{ fontSize: 10.5, marginTop: 3 }}>
                {pr.reading ? 'Reading the label…' : pr.failed ? "Couldn't read it — type the name" : 'From your photo'}
              </div>
            </div>
            <span onClick={() => removePhotoProduct(pr.id)} style={{ cursor: 'pointer', fontSize: 14, fontWeight: 700, color: 'var(--color-accent-2-700)', flex: 'none' }}>×</span>
          </div>
        ))}

        <div style={{ display: 'flex', gap: 7, marginTop: 3 }}>
          <input
            className="input" type="text" placeholder="Add a product you use" value={productInput}
            onChange={(e) => setProductInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); submit(); } }}
            style={{ flex: 1, minWidth: 0 }}
          />
          <button className="btn btn-secondary" onClick={submit} style={{ flex: 'none' }}>Add</button>
        </div>
        <label className="btn btn-secondary btn-block" style={{ width: '100%', boxSizing: 'border-box', textAlign: 'center', cursor: 'pointer', marginTop: 7 }}>
          Add by photo
          <input
            type="file" accept="image/*" capture="environment" style={{ display: 'none' }}
            onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ''; if (f) addPhotoProduct(f); }}
          />
        </label>
        <div style={{ fontSize: 10.5, lineHeight: 1.45, color: 'color-mix(in srgb, var(--color-text) 52%, transparent)', marginTop: 5 }}>
          Photograph the front of the bottle and add the name — automatic label reading isn't connected yet, so type it in once the photo's attached.
        </div>
      </div>
    </>
  );
}
