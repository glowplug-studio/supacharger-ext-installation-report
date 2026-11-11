# Using the installation report

This is a temporary, local-only installation UI. It reads `docs/reports/sc-install/first-install-handhold-me.md`; maintain progress in that developer-owned checklist and never edit the Core reference to change the display.

The extension must not remain in a deployed application. When installation is complete, remove every manifest-listed installation-report target. Removing `src/app/(project)/(extensions)/(sc_extensions)/(installation-report)/` removes the page hook without any application layout edit; restart development or build so Core regenerates its page-hook registry.
