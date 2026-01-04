/**
 * CSS Modules Type Declaration
 * Allows importing .module.css files with TypeScript
 */

declare module '*.module.css' {
  export const styles: { [key: string]: string };
  const defaultExport: { [key: string]: string };
  export = defaultExport;
}

declare module '*.css' {
  const content: string;
  export default content;
}
