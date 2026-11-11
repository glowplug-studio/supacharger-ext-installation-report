import { SC_CONFIG } from '@/supacharger/supacharger-config';

import { InstallationReportPopover } from './_components/installation-report-popover';
import { readInstallationChecklist } from './_lib/checklist';
import { createInstallationConfigReport } from './_lib/config-report';

export default function InstallationReportPageHook() {
  const report = readInstallationChecklist();
  return report ? (
    <InstallationReportPopover configReport={createInstallationConfigReport(SC_CONFIG)} initialReport={report} />
  ) : null;
}
