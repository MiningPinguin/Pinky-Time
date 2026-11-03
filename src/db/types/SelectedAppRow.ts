/**
 * Raw row shape of the `selected_apps` SQLite table (see `src/db/schema.ts`).
 * snake_case fields mirror the SQL column names; booleans are stored as 0/1.
 */
export interface SelectedAppRow {
  package_name: string;
  label: string;
  is_social: number;
}
