import { Rule } from 'antd/es/form';
import { Option } from '../Item/item.utils';

export const ethiopiaRegions: Option[] = [
  {
    value: 'addisAbaba',
    label: 'Addis Ababa',
    children: [
      {
        value: 'arada',
        label: 'Arada',
      },
      {
        value: 'bole',
        label: 'Bole',
      },
      {
        value: 'kirkos',
        label: 'Kirkos',
      },
      {
        value: 'kolfeKeranio',
        label: 'Kolfe Keranio',
      },
      {
        value: 'lideta',
        label: 'Lideta',
      },
      {
        value: 'nifasSilkLafto',
        label: 'Nifas Silk-Lafto',
      },
      {
        value: 'yeka',
        label: 'Yeka',
      },
      {
        value: 'akakyKaliti',
        label: 'Akaky Kaliti',
      },
      {
        value: 'addisKetema',
        label: 'Addis Ketema',
      },
      {
        value: 'gullele',
        label: 'Gullele',
      },
      {
        value: 'lomikura',
        label: 'Lomi Kura',
      },
      {
        value: 'akakiKality',
        label: 'Akaki Kality',
      },
    ],
  },
  {
    value: 'direDawa',
    label: 'Dire Dawa',
  },
  {
    value: 'oromia',
    label: 'Oromia',
    children: [
      {
        value: 'addisAlem',
        label: 'Addis Alem',
      },
      {
        value: 'adama',
        label: 'Adama',
      },
      // Add other cities in Oromia as needed
    ],
  },
  {
    value: 'amhara',
    label: 'Amhara',
    children: [
      {
        value: 'bahirDar',
        label: 'Bahir Dar',
      },
      {
        value: 'gondar',
        label: 'Gondar',
      },
      // Add other cities in Amhara as needed
    ],
  },
  {
    value: 'tigray',
    label: 'Tigray',
    children: [
      {
        value: 'mekelle',
        label: 'Mekelle',
      },
      {
        value: 'adigrat',
        label: 'Adigrat',
      },
      // Add other cities in Tigray as needed
    ],
  },
  {
    value: 'SNNPR',
    label: 'SNNPR',
    children: [
      {
        value: 'hawassa',
        label: 'Hawassa',
      },
      {
        value: 'arbaMinch',
        label: 'Arba Minch',
      },
      // Add other cities in SNNPR as needed
    ],
  },
  // Add more regions and cities as needed
];
export const ethiopiaRegionsFlat: Option[] = [
  {
    value: 'addisAbaba',
    label: 'Addis Ababa',
  },
  {
    value: 'arada',
    label: 'Arada',
    parent: 'addisAbaba',
  },
  {
    value: 'bole',
    label: 'Bole',
    parent: 'addisAbaba',
  },
  {
    value: 'kirkos',
    label: 'Kirkos',
    parent: 'addisAbaba',
  },
  {
    value: 'kolfeKeranio',
    label: 'Kolfe Keranio',
    parent: 'addisAbaba',
  },
  {
    value: 'lideta',
    label: 'Lideta',
    parent: 'addisAbaba',
  },
  {
    value: 'nifasSilkLafto',
    label: 'Nifas Silk-Lafto',
    parent: 'addisAbaba',
  },
  {
    value: 'yeka',
    label: 'Yeka',
    parent: 'addisAbaba',
  },
  {
    value: 'akakyKaliti',
    label: 'Akaky Kaliti',
    parent: 'addisAbaba',
  },
  {
    value: 'addisKetema',
    label: 'Addis Ketema',
    parent: 'addisAbaba',
  },
  {
    value: 'gullele',
    label: 'Gullele',
    parent: 'addisAbaba',
  },
  {
    value: 'lomikura',
    label: 'Lomi Kura',
    parent: 'addisAbaba',
  },
  {
    value: 'akakiKality',
    label: 'Akaki Kality',
    parent: 'addisAbaba',
  },
  {
    value: 'direDawa',
    label: 'Dire Dawa',
  },
  {
    value: 'addisAlem',
    label: 'Addis Alem',
    parent: 'oromia',
  },
  {
    value: 'adama',
    label: 'Adama',
    parent: 'oromia',
  },
  {
    value: 'bahirDar',
    label: 'Bahir Dar',
    parent: 'amhara',
  },
  {
    value: 'gondar',
    label: 'Gondar',
    parent: 'amhara',
  },
  {
    value: 'mekelle',
    label: 'Mekelle',
    parent: 'tigray',
  },
  {
    value: 'adigrat',
    label: 'Adigrat',
    parent: 'tigray',
  },
  {
    value: 'hawassa',
    label: 'Hawassa',
    parent: 'SNNPR',
  },
  {
    value: 'arbaMinch',
    label: 'Arba Minch',
    parent: 'SNNPR',
  },
];

export const validatePhone = async (_: Rule, value: number | null) => {
  if (!value) {
    return Promise.resolve(); // Validation passed
  }
  if (value?.toString().length && value.toString().length === 9) {
    return Promise.resolve(); // Validation passed
  } else {
    return Promise.reject('Invalid phone'); // Validation failed
  }
};
