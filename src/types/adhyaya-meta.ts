/**
 * AdhyayaMeta
 * ---------------------------------------------------------------------
 * Mirrors every adhyaya-meta.json file. `colophon` is optional - only
 * chapters with real verse content need one (it's the traditional
 * closing statement naming the text/section/chapter).
 * ---------------------------------------------------------------------
 */
export interface AdhyayaMeta {
  adhyayaId: string;
  textId: string;
  divisionId: string;
  order: number;
  name: {
    sanskrit: string;
  };
  status: "available" | "coming-soon";
  colophon?: string;
}
