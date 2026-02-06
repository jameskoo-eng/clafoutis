export function CardPreview() {
  const surfaceStyle: React.CSSProperties = {
    backgroundColor: "rgb(var(--colors-surface-primary, 255 255 255))",
    borderColor: "rgb(var(--colors-border-primary, 229 231 235))",
    color: "rgb(var(--colors-text-primary, 17 17 17))",
  };

  return (
    <div className="space-y-3">
      {/* Default card with shadow */}
      <div
        className="rounded-lg p-4 shadow-md"
        style={{
          backgroundColor: "rgb(var(--colors-surface-secondary, 255 255 255))",
          color: "rgb(var(--colors-text-primary, 17 17 17))",
        }}
      >
        <p className="text-sm font-medium">Default (shadow)</p>
        <p
          className="text-xs"
          style={{ color: "rgb(var(--colors-text-secondary, 102 102 102))" }}
        >
          Card with drop shadow
        </p>
      </div>

      {/* Bordered card */}
      <div className="rounded-lg border p-4" style={surfaceStyle}>
        <p className="text-sm font-medium">Bordered</p>
        <p
          className="text-xs"
          style={{ color: "rgb(var(--colors-text-secondary, 102 102 102))" }}
        >
          Card with border
        </p>
      </div>

      {/* Interactive card */}
      <div
        className="cursor-pointer rounded-lg border p-4 transition-shadow hover:shadow-md"
        style={surfaceStyle}
      >
        <h4 className="font-medium">Interactive Card</h4>
        <p
          className="mt-1 text-sm"
          style={{ color: "rgb(var(--colors-text-secondary, 102 102 102))" }}
        >
          Hover to see the shadow effect. This card could link somewhere.
        </p>
        <button
          className="mt-3 rounded-md px-3 py-1.5 text-sm font-medium"
          style={{
            backgroundColor: "rgb(var(--colors-button-primary-bg, 0 0 0))",
            color: "rgb(var(--colors-button-primary-text, 255 255 255))",
          }}
        >
          Action
        </button>
      </div>
    </div>
  );
}
