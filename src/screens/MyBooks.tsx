import BackLink from '../components/BackLink';
import ImagePlaceholder from '../components/ImagePlaceholder';
import bookCover from '../assets/book-motivated-student.png';

export default function MyBooks() {
  return (
    <div className="screen-pad">
      <BackLink to="/more" label="More" />
      <h2 style={{ fontSize: 21, margin: '6px 0 16px' }}>My Books</h2>

      <div style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
        <ImagePlaceholder label="Book cover" src={bookCover} radius={10} style={{ width: 120, height: 168, flex: 'none' }} />
        <div>
          <div style={{ fontSize: 11, color: 'var(--color-accent-2-700)', textTransform: 'uppercase', letterSpacing: '.03em', fontWeight: 600 }}>By Danielle Cryer</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 19, color: 'var(--color-text)', margin: '3px 0' }}>I Believe in Me</div>
          <div className="muted" style={{ fontSize: 12 }}>The Motivated Student guidebook</div>
        </div>
      </div>
      <p className="muted-70" style={{ fontSize: 13, lineHeight: 1.6, margin: '0 0 16px' }}>
        A short, encouraging read on confidence and self-belief — the same mindset Cryer Aesthetics brings to every skin journey.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <a href="https://www.amazon.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-block" style={{ width: '100%', textAlign: 'center', boxSizing: 'border-box' }}>Get it on Kindle</a>
        <a href="https://www.amazon.com" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-block" style={{ width: '100%', textAlign: 'center', boxSizing: 'border-box' }}>Buy on Amazon</a>
      </div>

      <div className="hr" style={{ margin: '24px 0' }} />

      <div style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
        <ImagePlaceholder label="Second book cover" radius={10} style={{ width: 100, height: 140, flex: 'none' }} />
        <div>
          <div style={{ fontSize: 11, color: 'var(--color-accent-2-700)', textTransform: 'uppercase', letterSpacing: '.03em', fontWeight: 600 }}>By Danielle Cryer</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 19, color: 'var(--color-text)', margin: '3px 0' }}>Second book title</div>
          <div className="muted" style={{ fontSize: 12 }}>Series or subtitle</div>
        </div>
      </div>
      <p className="muted-70" style={{ fontSize: 13, lineHeight: 1.6, margin: '0 0 16px' }}>
        A short description of the second book goes here — what it covers and who it's for.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <a href="https://www.amazon.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-block" style={{ width: '100%', textAlign: 'center', boxSizing: 'border-box' }}>Get it on Kindle</a>
        <a href="https://www.amazon.com" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-block" style={{ width: '100%', textAlign: 'center', boxSizing: 'border-box' }}>Buy on Amazon</a>
      </div>
    </div>
  );
}
