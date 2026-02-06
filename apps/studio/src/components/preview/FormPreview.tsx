export function FormPreview() {
  const inputStyle: React.CSSProperties = {
    borderColor: "rgb(var(--colors-border-primary, 209 213 219))",
    backgroundColor: "rgb(var(--colors-surface-secondary, 255 255 255))",
    color: "rgb(var(--colors-text-primary, 17 17 17))",
  };

  const labelStyle: React.CSSProperties = {
    color: "rgb(var(--colors-text-secondary, 55 65 81))",
  };

  return (
    <div className="space-y-4">
      {/* Text input */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="preview-email"
          className="text-sm font-medium"
          style={labelStyle}
        >
          Email
        </label>
        <input
          id="preview-email"
          type="email"
          placeholder="you@example.com"
          className="rounded-md border px-3 py-2 text-sm placeholder:opacity-50 focus:outline-none focus:ring-2"
          style={inputStyle}
        />
      </div>

      {/* Input with error */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="preview-password"
          className="text-sm font-medium"
          style={labelStyle}
        >
          Password
        </label>
        <input
          id="preview-password"
          type="password"
          placeholder="Enter password"
          className="rounded-md border px-3 py-2 text-sm placeholder:opacity-50 focus:outline-none focus:ring-2"
          style={{
            ...inputStyle,
            borderColor: "rgb(var(--colors-state-error-primary, 239 68 68))",
          }}
        />
        <span
          className="text-sm"
          style={{ color: "rgb(var(--colors-state-error-primary, 239 68 68))" }}
        >
          Password is required
        </span>
      </div>

      {/* Select */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="preview-role"
          className="text-sm font-medium"
          style={labelStyle}
        >
          Role
        </label>
        <select
          id="preview-role"
          className="rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2"
          style={inputStyle}
        >
          <option>Designer</option>
          <option>Developer</option>
          <option>Manager</option>
        </select>
      </div>

      {/* Checkbox */}
      <div className="flex items-center gap-2">
        <input
          id="preview-remember"
          type="checkbox"
          className="rounded"
          defaultChecked
        />
        <label
          htmlFor="preview-remember"
          className="text-sm"
          style={{ color: "rgb(var(--colors-text-primary, 17 17 17))" }}
        >
          Remember me
        </label>
      </div>
    </div>
  );
}
