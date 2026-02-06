const variantStyles: Record<string, React.CSSProperties> = {
  primary: {
    backgroundColor: "rgb(var(--colors-button-primary-bg, 0 0 0))",
    color: "rgb(var(--colors-button-primary-text, 255 255 255))",
  },
  secondary: {
    backgroundColor: "rgb(var(--colors-button-secondary-bg, 229 229 229))",
    color: "rgb(var(--colors-button-secondary-text, 17 17 17))",
  },
  accent: {
    backgroundColor: "rgb(var(--colors-button-accent-bg, 59 130 246))",
    color: "rgb(var(--colors-button-accent-text, 255 255 255))",
  },
  success: {
    backgroundColor: "rgb(var(--colors-button-success-bg, 34 197 94))",
    color: "rgb(var(--colors-button-success-text, 255 255 255))",
  },
  error: {
    backgroundColor: "rgb(var(--colors-button-error-bg, 239 68 68))",
    color: "rgb(var(--colors-button-error-text, 255 255 255))",
  },
  warning: {
    backgroundColor: "rgb(var(--colors-button-warning-bg, 245 158 11))",
    color: "rgb(var(--colors-button-warning-text, 0 0 0))",
  },
  info: {
    backgroundColor: "rgb(var(--colors-button-info-bg, 59 130 246))",
    color: "rgb(var(--colors-button-info-text, 255 255 255))",
  },
  link: {
    backgroundColor: "transparent",
    color: "rgb(var(--colors-button-link-text, 37 99 235))",
    textDecoration: "underline",
  },
};

const sizeClasses: Record<string, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export function ButtonPreview() {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="mb-2 text-sm font-medium text-studio-text">Sizes</h4>
        <div className="flex flex-wrap items-center gap-2">
          {["sm", "md", "lg"].map((size) => (
            <button
              key={size}
              className={`rounded-md font-medium transition-all ${sizeClasses[size]}`}
              style={variantStyles.primary}
            >
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium text-studio-text">Variants</h4>
        <div className="flex flex-wrap gap-2">
          {Object.entries(variantStyles).map(([name, style]) => (
            <button
              key={name}
              className="rounded-md px-4 py-2 text-sm font-medium transition-all"
              style={style}
            >
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
