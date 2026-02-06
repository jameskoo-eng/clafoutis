interface BadgeConfig {
  label: string;
  bgRgb: string;
  textRgb: string;
}

const badges: BadgeConfig[] = [
  {
    label: "Default",
    bgRgb: "var(--colors-surface-primary, 243 244 246)",
    textRgb: "var(--colors-text-primary, 17 17 17)",
  },
  {
    label: "Info",
    bgRgb: "var(--colors-state-info-primary, 59 130 246)",
    textRgb: "255 255 255",
  },
  {
    label: "Success",
    bgRgb: "var(--colors-state-success-primary, 34 197 94)",
    textRgb: "255 255 255",
  },
  {
    label: "Warning",
    bgRgb: "var(--colors-state-warning-primary, 245 158 11)",
    textRgb: "0 0 0",
  },
  {
    label: "Error",
    bgRgb: "var(--colors-state-error-primary, 239 68 68)",
    textRgb: "255 255 255",
  },
];

export function BadgePreview() {
  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge) => (
        <span
          key={badge.label}
          className="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium"
          style={{
            backgroundColor: `rgb(${badge.bgRgb})`,
            color: `rgb(${badge.textRgb})`,
          }}
        >
          {badge.label}
        </span>
      ))}
    </div>
  );
}
