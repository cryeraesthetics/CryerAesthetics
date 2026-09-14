interface Props {
  label: string;
  radius?: number;
  style?: React.CSSProperties;
  photoUrl?: string | null;
  onFile: (file: File) => void;
}

// A real click/tap-to-upload image slot for member-generated content
// (diary progress photos, shelf product photos).
export default function PhotoUpload({ label, radius = 14, style, photoUrl, onFile }: Props) {
  return (
    <div className="image-slot" style={{ borderRadius: radius, ...style }}>
      {photoUrl ? (
        <img src={photoUrl} alt={label} style={{ objectFit: 'cover' }} />
      ) : (
        <span>{label}</span>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = '';
          if (file) onFile(file);
        }}
      />
    </div>
  );
}
