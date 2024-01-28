import { IDischarge, IItem } from '@/Interface/Item/item.interface';
import { IPurchase } from '@/Interface/Purchase/purchase.interface';

export interface Option {
  value: string | number;
  label?: string;
  icon?: React.ReactElement;
  children?: Option[];
  parent?: string;
}
export const categoryOptions: Option[] = [
  {
    value: 'officeSupplies',
    label: 'Office Supplies',
    children: [
      {
        value: 'pensPencils',
        label: 'Pens, Pencils, Erasers',
      },
      {
        value: 'paperNotebooks',
        label: 'Paper, Notebooks',
      },
    ],
  },
  {
    value: 'classroomFurniture',
    label: 'Classroom Furniture',
    children: [
      {
        value: 'desks',
        label: 'Desks',
      },
      {
        value: 'chairs',
        label: 'Chairs',
      },
    ],
  },
  {
    value: 'educationalMaterials',
    label: 'Educational Materials',
    children: [
      {
        value: 'textbooks',
        label: 'Textbooks',
      },
      {
        value: 'referenceMaterials',
        label: 'Reference Materials',
      },
    ],
  },
  {
    value: 'itEquipment',
    label: 'IT Equipment',
    children: [
      {
        value: 'computers',
        label: 'Computers',
      },
      {
        value: 'laptops',
        label: 'Laptops',
      },
    ],
  },
  {
    value: 'laboratoryEquipment',
    label: 'Laboratory Equipment',
    children: [
      {
        value: 'microscopes',
        label: 'Microscopes',
      },
      {
        value: 'labGlassware',
        label: 'Lab Glassware',
      },
    ],
  },
  {
    value: 'sportsEquipment',
    label: 'Sports Equipment',
    children: [
      {
        value: 'balls',
        label: 'Balls (Soccer, Basketball, etc.)',
      },
      {
        value: 'sportsUniforms',
        label: 'Sports Uniforms',
      },
    ],
  },
  {
    value: 'maintenanceSupplies',
    label: 'Maintenance Supplies',
    children: [
      {
        value: 'cleaningSupplies',
        label: 'Cleaning Supplies',
      },
      {
        value: 'tools',
        label: 'Tools',
      },
    ],
  },
  {
    value: 'libraryInventory',
    label: 'Library Inventory',
    children: [
      {
        value: 'books',
        label: 'Books',
      },
      {
        value: 'magazines',
        label: 'Magazines',
      },
    ],
  },
  {
    value: 'artSupplies',
    label: 'Art Supplies',
    children: [
      {
        value: 'paints',
        label: 'Paints',
      },
      {
        value: 'brushes',
        label: 'Brushes',
      },
    ],
  },
  {
    value: 'musicalInstruments',
    label: 'Musical Instruments',
    children: [
      {
        value: 'guitars',
        label: 'Guitars',
      },
      {
        value: 'drums',
        label: 'Drums',
      },
    ],
  },
  {
    value: 'cafeteriaSupplies',
    label: 'Cafeteria Supplies',
    children: [
      {
        value: 'platesCupsUtensils',
        label: 'Plates, Cups, Utensils',
      },
      {
        value: 'kitchenEquipment',
        label: 'Kitchen Equipment',
      },
    ],
  },
  {
    value: 'uniformsAndApparel',
    label: 'Uniforms and Apparel',
    children: [
      {
        value: 'schoolUniforms',
        label: 'School Uniforms',
      },
      {
        value: 'teamUniforms',
        label: 'Team Uniforms',
      },
    ],
  },
];
export const categoryOptionsFlat: Option[] = [
  {
    value: 'officeSupplies',
    label: 'Office Supplies',
  },
  {
    value: 'pensPencils',
    label: 'Pens, Pencils, Erasers',
    parent: 'officeSupplies',
  },
  {
    value: 'paperNotebooks',
    label: 'Paper, Notebooks',
    parent: 'officeSupplies',
  },
  {
    value: 'classroomFurniture',
    label: 'Classroom Furniture',
  },
  {
    value: 'desks',
    label: 'Desks',
    parent: 'classroomFurniture',
  },
  {
    value: 'chairs',
    label: 'Chairs',
    parent: 'classroomFurniture',
  },
  {
    value: 'educationalMaterials',
    label: 'Educational Materials',
  },
  {
    value: 'textbooks',
    label: 'Textbooks',
    parent: 'educationalMaterials',
  },
  {
    value: 'referenceMaterials',
    label: 'Reference Materials',
    parent: 'educationalMaterials',
  },
  {
    value: 'itEquipment',
    label: 'IT Equipment',
  },
  {
    value: 'computers',
    label: 'Computers',
    parent: 'itEquipment',
  },
  {
    value: 'laptops',
    label: 'Laptops',
    parent: 'itEquipment',
  },
  {
    value: 'laboratoryEquipment',
    label: 'Laboratory Equipment',
  },
  {
    value: 'microscopes',
    label: 'Microscopes',
    parent: 'laboratoryEquipment',
  },
  {
    value: 'labGlassware',
    label: 'Lab Glassware',
    parent: 'laboratoryEquipment',
  },
  {
    value: 'sportsEquipment',
    label: 'Sports Equipment',
  },
  {
    value: 'balls',
    label: 'Balls (Soccer, Basketball, etc.)',
    parent: 'sportsEquipment',
  },
  {
    value: 'sportsUniforms',
    label: 'Sports Uniforms',
    parent: 'sportsEquipment',
  },
  {
    value: 'maintenanceSupplies',
    label: 'Maintenance Supplies',
  },
  {
    value: 'cleaningSupplies',
    label: 'Cleaning Supplies',
    parent: 'maintenanceSupplies',
  },
  {
    value: 'tools',
    label: 'Tools',
    parent: 'maintenanceSupplies',
  },
  {
    value: 'libraryInventory',
    label: 'Library Inventory',
  },
  {
    value: 'books',
    label: 'Books',
    parent: 'libraryInventory',
  },
  {
    value: 'magazines',
    label: 'Magazines',
    parent: 'libraryInventory',
  },
  {
    value: 'artSupplies',
    label: 'Art Supplies',
  },
  {
    value: 'paints',
    label: 'Paints',
    parent: 'artSupplies',
  },
  {
    value: 'brushes',
    label: 'Brushes',
    parent: 'artSupplies',
  },
  {
    value: 'musicalInstruments',
    label: 'Musical Instruments',
  },
  {
    value: 'guitars',
    label: 'Guitars',
    parent: 'musicalInstruments',
  },
  {
    value: 'drums',
    label: 'Drums',
    parent: 'musicalInstruments',
  },
  {
    value: 'cafeteriaSupplies',
    label: 'Cafeteria Supplies',
  },
  {
    value: 'platesCupsUtensils',
    label: 'Plates, Cups, Utensils',
    parent: 'cafeteriaSupplies',
  },
  {
    value: 'kitchenEquipment',
    label: 'Kitchen Equipment',
    parent: 'cafeteriaSupplies',
  },
  {
    value: 'uniformsAndApparel',
    label: 'Uniforms and Apparel',
  },
  {
    value: 'schoolUniforms',
    label: 'School Uniforms',
    parent: 'uniformsAndApparel',
  },
  {
    value: 'teamUniforms',
    label: 'Team Uniforms',
    parent: 'uniformsAndApparel',
  },
];
export const getStockAmount = (
  record: IItem | null,
  purchases: IPurchase[],
  discharges: IDischarge[]
): number => {
  if (!record) {
    return 0;
  }
  const purchasedAmount = purchases.reduce((tsum, purchase) => {
    const eligableItems = purchase.items.filter(
      (pi) => pi.item?.id === record.id
    );
    const total = eligableItems.reduce((sum, pi) => {
      const quantity = pi.quantity ?? 0;
      return sum + quantity;
    }, 0);
    return tsum + total;
  }, 0);
  const startQuantity = record.startQuantity ?? 0;
  const dischargedAmount = discharges
    .filter((discharge) => discharge.item.id === record.id)
    .reduce((sum, dis) => {
      const quantity = dis.quantity;
      return sum + quantity;
    }, 0);
  return startQuantity + purchasedAmount - dischargedAmount;
};
