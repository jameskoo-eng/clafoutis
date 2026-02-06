import type { ResolvedToken } from "@clafoutis/studio-core";

import { AlertPreview } from "../preview/AlertPreview";
import { BadgePreview } from "../preview/BadgePreview";
import { ButtonPreview } from "../preview/ButtonPreview";
import { CardPreview } from "../preview/CardPreview";
import { ColorPalettePreview } from "../preview/ColorPalettePreview";
import { FormPreview } from "../preview/FormPreview";
import { SpacingPreview } from "../preview/SpacingPreview";
import { TypographyPreview } from "../preview/TypographyPreview";
import { Button } from "../ui/button";

interface ComponentsPreviewViewProps {
  darkMode: boolean;
  colorTokens: ResolvedToken[];
  onToggleDarkMode: () => void;
}

function Section({
  title,
  children,
}: Readonly<{ title: string; children: React.ReactNode }>) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-semibold text-studio-text">{title}</h2>
      {children}
    </section>
  );
}

function SectionCard({
  title,
  children,
}: Readonly<{ title?: string; children: React.ReactNode }>) {
  return (
    <div className="rounded-lg border border-studio-border bg-studio-bg-secondary p-6">
      {title && (
        <h3 className="mb-4 text-lg font-semibold text-studio-text">{title}</h3>
      )}
      {children}
    </div>
  );
}

const ComponentsPreviewView = ({
  darkMode,
  colorTokens,
  onToggleDarkMode,
}: ComponentsPreviewViewProps) => (
  <div className="overflow-y-auto p-6">
    <div className="mx-auto max-w-5xl">
      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-studio-text">
          Design System Preview
        </h1>
        <Button variant="outline" size="sm" onClick={onToggleDarkMode}>
          {darkMode ? "Light" : "Dark"} Mode
        </Button>
      </header>

      {/* Hero */}
      <section className="mb-8 py-8 text-center">
        <h2 className="mb-3 text-4xl font-bold text-studio-text">
          Component Showcase
        </h2>
        <p className="mx-auto mb-6 max-w-2xl text-lg text-studio-text-secondary">
          Live preview of your design tokens applied to common UI patterns.
          Hover over color swatches to see the full token path.
        </p>
      </section>

      <div id="studio-preview-root" className={darkMode ? "dark" : ""}>
        {/* Color Palettes */}
        <Section title="Color Palettes">
          <SectionCard>
            <ColorPalettePreview tokens={colorTokens} />
          </SectionCard>
        </Section>

        {/* Spacing Scale */}
        <Section title="Spacing Scale">
          <SectionCard>
            <SpacingPreview />
          </SectionCard>
        </Section>

        {/* Typography */}
        <Section title="Typography">
          <TypographyPreview />
        </Section>

        {/* Components */}
        <Section title="Components">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <SectionCard title="Buttons">
              <ButtonPreview />
            </SectionCard>

            <SectionCard title="Badges">
              <BadgePreview />
            </SectionCard>

            <SectionCard title="Inputs">
              <FormPreview />
            </SectionCard>

            <SectionCard title="Cards">
              <CardPreview />
            </SectionCard>
          </div>
        </Section>

        {/* Alerts */}
        <Section title="Alerts">
          <AlertPreview />
        </Section>
      </div>
    </div>
  </div>
);

export default ComponentsPreviewView;
