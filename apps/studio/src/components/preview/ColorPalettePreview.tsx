import type { ResolvedToken } from "@clafoutis/studio-core";
import { useState } from "react";

interface ColorPalettePreviewProps {
  tokens: ResolvedToken[];
}

interface TokenGroup {
  name: string;
  description?: string;
  tokens: ResolvedToken[];
}

/** Groups flat token list into nested groups by path segments. */
function groupTokens(tokens: ResolvedToken[]): {
  semantic: TokenGroup[];
  component: TokenGroup[];
  primitive: TokenGroup[];
} {
  const groups = new Map<string, ResolvedToken[]>();

  for (const token of tokens) {
    const parts = token.path.split(".");
    // Group by first two segments (e.g., "colors.background", "colors.blue")
    const groupKey = parts.length >= 2 ? `${parts[0]}.${parts[1]}` : parts[0];
    if (!groups.has(groupKey)) groups.set(groupKey, []);
    groups.get(groupKey)!.push(token);
  }

  const semanticKeys = new Set([
    "colors.background",
    "colors.foreground",
    "colors.text",
    "colors.surface",
    "colors.border",
    "colors.separator",
    "colors.icon",
    "colors.state",
  ]);
  const componentKeys = new Set(["colors.button", "colors.progress"]);

  const semantic: TokenGroup[] = [];
  const component: TokenGroup[] = [];
  const primitive: TokenGroup[] = [];

  for (const [key, groupTokens] of groups) {
    const name = key.split(".").slice(1).join(".");
    const group: TokenGroup = { name: name || key, tokens: groupTokens };

    if (semanticKeys.has(key)) {
      semantic.push(group);
    } else if (componentKeys.has(key)) {
      component.push(group);
    } else {
      primitive.push(group);
    }
  }

  return { semantic, component, primitive };
}

function Swatch({ token }: { token: ResolvedToken }) {
  const [hovered, setHovered] = useState(false);
  const value =
    typeof token.resolvedValue === "string" ? token.resolvedValue : undefined;
  const shade = token.path.split(".").pop() ?? "";
  const refInfo = token.reference ? ` -> {${token.reference}}` : "";

  return (
    <div
      className="group relative text-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="mx-auto h-10 w-10 rounded-lg border border-studio-border shadow-sm transition-transform group-hover:scale-110"
        style={{ backgroundColor: value }}
      />
      <p className="mt-1 text-[10px] text-studio-text-muted">{shade}</p>

      {hovered && (
        <div className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-studio-bg-secondary px-2 py-1 text-xs shadow-lg border border-studio-border">
          <p className="font-mono font-medium text-studio-text">{token.path}</p>
          {value && (
            <p className="text-studio-text-muted">
              {value}
              {refInfo}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function TokenGroupRow({ group }: { group: TokenGroup }) {
  return (
    <div>
      <h4 className="mb-1 text-sm font-medium capitalize text-studio-text">
        {group.name}
      </h4>
      {group.description && (
        <p className="mb-2 text-xs text-studio-text-muted">
          {group.description}
        </p>
      )}
      <div className="flex flex-wrap gap-1">
        {group.tokens.map((token) => (
          <Swatch key={token.path} token={token} />
        ))}
      </div>
    </div>
  );
}

export function ColorPalettePreview({
  tokens,
}: Readonly<ColorPalettePreviewProps>) {
  const { semantic, component, primitive } = groupTokens(tokens);

  return (
    <div className="space-y-8">
      {semantic.length > 0 && (
        <div>
          <h3 className="mb-1 text-base font-semibold text-studio-text">
            Semantic Tokens
          </h3>
          <p className="mb-4 text-xs text-studio-text-muted">
            Named colors with meaning -- background, text, border, state
          </p>
          <div className="space-y-4">
            {semantic.map((g) => (
              <TokenGroupRow key={g.name} group={g} />
            ))}
          </div>
        </div>
      )}

      {component.length > 0 && (
        <>
          <hr className="border-studio-border" />
          <div>
            <h3 className="mb-1 text-base font-semibold text-studio-text">
              Component Tokens
            </h3>
            <p className="mb-4 text-xs text-studio-text-muted">
              Token values bound to specific UI components
            </p>
            <div className="space-y-4">
              {component.map((g) => (
                <TokenGroupRow key={g.name} group={g} />
              ))}
            </div>
          </div>
        </>
      )}

      {primitive.length > 0 && (
        <>
          <hr className="border-studio-border" />
          <div>
            <h3 className="mb-1 text-base font-semibold text-studio-text">
              Primitive Colors
            </h3>
            <p className="mb-4 text-xs text-studio-text-muted">
              Raw color values that semantic tokens reference
            </p>
            <div className="space-y-4">
              {primitive.map((g) => (
                <TokenGroupRow key={g.name} group={g} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
