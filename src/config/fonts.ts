export const FONT_OPTIONS = [
  { label: 'Fira Sans', value: 'Fira Sans' },
  { label: 'Inter', value: 'Inter' },
  { label: 'Roboto', value: 'Roboto' },
  { label: 'Poppins', value: 'Poppins' },
  { label: 'Montserrat', value: 'Montserrat' },
  { label: 'Open Sans', value: 'Open Sans' },
] as const;

export type FontFamily = typeof FONT_OPTIONS[number]['value'];