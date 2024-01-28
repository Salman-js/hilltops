export interface Option {
  value: string | number;
  label: string;
  children?: Option[];
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
      // Add other office supplies as needed
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
      // Add other classroom furniture items as needed
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
      // Add other educational materials as needed
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
      // Add other IT equipment items as needed
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
      // Add other laboratory equipment items as needed
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
      // Add other sports equipment items as needed
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
      // Add other maintenance supplies as needed
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
      // Add other library inventory items as needed
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
      // Add other art supplies as needed
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
      // Add other musical instruments as needed
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
      // Add other cafeteria supplies as needed
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
      // Add other uniforms and apparel items as needed
    ],
  },
  // Add more categories as needed
];
