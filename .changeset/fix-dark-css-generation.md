---
"@clafoutis/generators": patch
---

Fix dark.css not being generated when semantic tokens exist in both light and dark modes

The Tailwind generator now correctly outputs dark.css by loading base tokens first, then dark tokens, ensuring dark values take precedence over light values for tokens defined in both files.
