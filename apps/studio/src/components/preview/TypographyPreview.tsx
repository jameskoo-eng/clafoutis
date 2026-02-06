function PreviewCard({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className="rounded-lg border p-4"
      style={{
        borderColor: "rgb(var(--colors-border-primary, 229 231 235))",
        backgroundColor: "rgb(var(--colors-surface-secondary, 255 255 255))",
      }}
    >
      {children}
    </div>
  );
}

export function TypographyPreview() {
  const textColor: React.CSSProperties = {
    color: "rgb(var(--colors-text-primary, 17 17 17))",
  };
  const surfaceBg: React.CSSProperties = {
    backgroundColor: "rgb(var(--colors-surface-primary, 245 245 245))",
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {/* Font Sizes */}
      <PreviewCard>
        <h4 className="mb-3 font-semibold text-studio-text">Font Sizes</h4>
        <div className="space-y-2" style={textColor}>
          <p style={{ fontSize: "2.25rem" }}>4xl - Display</p>
          <p style={{ fontSize: "1.875rem" }}>3xl - Heading 1</p>
          <p style={{ fontSize: "1.5rem" }}>2xl - Heading 2</p>
          <p style={{ fontSize: "1.25rem" }}>xl - Heading 3</p>
          <p style={{ fontSize: "1.125rem" }}>lg - Lead text</p>
          <p style={{ fontSize: "1rem" }}>base - Body text</p>
          <p style={{ fontSize: "0.875rem" }}>sm - Small text</p>
          <p style={{ fontSize: "0.75rem" }}>xs - Caption text</p>
        </div>
      </PreviewCard>

      {/* Font Weights */}
      <PreviewCard>
        <h4 className="mb-3 font-semibold text-studio-text">Font Weights</h4>
        <div className="space-y-2 text-lg" style={textColor}>
          <p style={{ fontWeight: 400 }}>Normal (400) - Regular text</p>
          <p style={{ fontWeight: 500 }}>Medium (500) - Slightly bold</p>
          <p style={{ fontWeight: 600 }}>Semibold (600) - Emphasis</p>
          <p style={{ fontWeight: 700 }}>Bold (700) - Strong emphasis</p>
        </div>
      </PreviewCard>

      {/* Font Families */}
      <PreviewCard>
        <h4 className="mb-3 font-semibold text-studio-text">Font Families</h4>
        <div className="space-y-3" style={textColor}>
          <div>
            <p className="mb-1 text-xs text-studio-text-muted">font-sans</p>
            <p className="font-sans text-lg">
              The quick brown fox jumps over the lazy dog
            </p>
          </div>
          <div>
            <p className="mb-1 text-xs text-studio-text-muted">font-serif</p>
            <p className="font-serif text-lg">
              The quick brown fox jumps over the lazy dog
            </p>
          </div>
          <div>
            <p className="mb-1 text-xs text-studio-text-muted">font-mono</p>
            <p className="font-mono text-lg">The quick brown fox jumps over</p>
          </div>
        </div>
      </PreviewCard>

      {/* Line Heights */}
      <PreviewCard>
        <h4 className="mb-3 font-semibold text-studio-text">Line Heights</h4>
        <div className="space-y-4" style={textColor}>
          <div>
            <p className="mb-1 text-xs text-studio-text-muted">tight (1.25)</p>
            <p
              className="rounded p-2 text-sm"
              style={{ lineHeight: 1.25, ...surfaceBg }}
            >
              This paragraph has tight line height. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
            </p>
          </div>
          <div>
            <p className="mb-1 text-xs text-studio-text-muted">normal (1.5)</p>
            <p
              className="rounded p-2 text-sm"
              style={{ lineHeight: 1.5, ...surfaceBg }}
            >
              This paragraph has normal line height. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
            </p>
          </div>
          <div>
            <p className="mb-1 text-xs text-studio-text-muted">
              relaxed (1.75)
            </p>
            <p
              className="rounded p-2 text-sm"
              style={{ lineHeight: 1.75, ...surfaceBg }}
            >
              This paragraph has relaxed line height. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt.
            </p>
          </div>
        </div>
      </PreviewCard>
    </div>
  );
}
