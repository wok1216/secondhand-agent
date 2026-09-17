# UI Typography Rules

Use the typography tokens declared in `styles.css` for all new or changed UI text. Do not introduce a one-off font size unless the visual role is genuinely new and the reason is documented in the change.

| Role | Token / value | Weight | Line height |
| --- | --- | --- | --- |
| Page title (H1) | `--type-page` (40px desktop, 32px mobile) | 700 | 1.25 |
| Section title (H2) | `--type-section` (28px desktop, 24px mobile) | 700 | 1.35 |
| Subsection title (H3) | `--type-subsection` (20px desktop, 18px mobile) | 700 | 1.35 |
| Body | `--type-body` (16px desktop, 15px mobile) | 400 | 1.7 |
| Button | `--type-button` (15px desktop, 14px mobile) | 600 | 1.35 |
| Caption, metadata, transaction information | `--type-caption` (13px desktop, 12px mobile) | 400 | 1.5 |

- Use `--font-ui` for Korean UI text and `--font-number` for price/number emphasis.
- Use `--icon-sm`, `--icon-md`, and `--icon-lg` for icons. Keep the icon vertically centered with its associated text and retain intrinsic image proportions with `object-fit: contain`.
- Dynamic product cards and detail modal elements must use the shared classes and selectors already covered by `#typography-system` in `index.html`.
- Prefer the role tokens over inline font declarations and avoid adding `!important` for typography.
- Preserve existing colors, copy, structure, interaction, and data behavior unless a task explicitly requests otherwise.
