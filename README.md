# Supacharger installation report

A temporary, local-only Supacharger extension that presents the live handhold-me installation checklist as a floating setup report.

The extension reads `docs/reports/sc-install/first-install-handhold-me.md`, displays resolved and outstanding checklist items, and provides a read-only report of `src/supacharger.config.ts`. It uses the Supacharger page-hook registry, so removing its installed application folder removes the UI without editing an application layout.

## Verify

```sh
npm run check
```

See `payload/docs/INSTALL.md` for installation and removal details.
