// import type { SettingsSchema } from "../types/Settings";

// export const DEFAULT_SETTINGS: SettingsSchema = {
//   // Layout Settings
//   marginTop: {
//     key: 'marginTop',
//     label: 'Top Margin',
//     type: "number",
//     value: 20,
//     min: 0,
//     max: 100,
//     step: 5,
//     description: 'Space from top of slide',
//   },
//   marginBottom: {
//     key: 'marginBottom',
//     label: 'Bottom Margin',
//     type: 'number',
//     value: 20,
//     min: 0,
//     max: 100,
//     step: 5,
//   },
//   marginLeft: {
//     key: 'marginLeft',
//     label: 'Left Margin',
//     type: 'number',
//     value: 40,
//     min: 0,
//     max: 100,
//     step: 5,
//   },
//   marginRight: {
//     key: 'marginRight',
//     label: 'Right Margin',
//     type: 'number',
//     value: 40,
//     min: 0,
//     max: 100,
//     step: 5,
//   },

//   // Appearance Settings
//   backgroundColor: {
//     key: 'backgroundColor',
//     label: 'Background Color',
//     type: 'color',
//     value: '#ffffff',
//   },
//   textColor: {
//     key: 'textColor',
//     label: 'Text Color',
//     type: 'color',
//     value: '#000000',
//   },

//   // Typography Settings
//   fontFamily: {
//     key: 'fontFamily',
//     label: 'Font Family',
//     type: 'autocomplete',
//     value: 'Arial',
//     suggestions: ['Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Verdana', 'Calibri'],
//     allowCustom: true,
//   },
//   fontSize: {
//     key: 'fontSize',
//     label: 'Font Size',
//     type: 'number',
//     value: 16,
//     min: 8,
//     max: 72,
//     step: 1,
//   },
//   textAlign: {
//     key: 'textAlign',
//     label: 'Text Alignment',
//     type: 'dropdownSelect',
//     value: 'left',
//     options: [
//       { label: 'Left', value: 'left' },
//       { label: 'Center', value: 'center' },
//       { label: 'Right', value: 'right' },
//       { label: 'Justify', value: 'justify' },
//     ],
//   },

//   orientation: {
//     key: 'orientation',
//     label: 'Layout Orientation',
//     type: 'dropdownSelect',
//     value: 'sideBySide',
//     options: [
//       { label: 'Side by Side', value: 'sideBySide' },
//       { label: 'Stacked', value: 'stacked' },
//     ],
//   },
// };