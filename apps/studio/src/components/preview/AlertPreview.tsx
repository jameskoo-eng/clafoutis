interface AlertConfig {
  variant: string;
  title: string;
  message: string;
  rgb: string;
}

const alerts: AlertConfig[] = [
  {
    variant: "info",
    title: "Information",
    message: "This is an informational alert using primary colors.",
    rgb: "var(--colors-state-info-primary, 59 130 246)",
  },
  {
    variant: "success",
    title: "Success",
    message: "Your changes have been saved successfully.",
    rgb: "var(--colors-state-success-primary, 34 197 94)",
  },
  {
    variant: "warning",
    title: "Warning",
    message: "Please review your input before proceeding.",
    rgb: "var(--colors-state-warning-primary, 245 158 11)",
  },
  {
    variant: "error",
    title: "Error",
    message: "Something went wrong. Please try again.",
    rgb: "var(--colors-state-error-primary, 239 68 68)",
  },
];

export function AlertPreview() {
  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <div
          key={alert.variant}
          className="rounded-md border-l-4 p-4"
          style={{
            borderLeftColor: `rgb(${alert.rgb})`,
            backgroundColor: `rgba(${alert.rgb} / 0.1)`,
            color: "rgb(var(--colors-text-primary, 17 17 17))",
          }}
        >
          <p className="font-semibold">{alert.title}</p>
          <p className="text-sm opacity-80">{alert.message}</p>
        </div>
      ))}
    </div>
  );
}
