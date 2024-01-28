import { BsBrush, BsBuildings } from 'react-icons/bs';
import { Option } from './item.utils';
import { GrBook, GrDesktop, GrGroup } from 'react-icons/gr';
import { GoBeaker } from 'react-icons/go';
import { BiFootball, BiHardHat } from 'react-icons/bi';
import { IoCafeOutline, IoLibraryOutline } from 'react-icons/io5';
import { PiGuitar } from 'react-icons/pi';
import { GiClothes } from 'react-icons/gi';

export const categoriesWithIcons: Option[] = [
  {
    value: 'officeSupplies',
    icon: <BsBuildings size={50} />,
  },
  {
    value: 'classroomFurniture',
    icon: <GrGroup size={50} />,
  },
  {
    value: 'educationalMaterials',
    icon: <GrBook size={50} />,
  },
  {
    value: 'itEquipment',
    icon: <GrDesktop size={50} />,
  },
  {
    value: 'laboratoryEquipment',
    icon: <GoBeaker size={50} />,
  },
  {
    value: 'sportsEquipment',
    icon: <BiFootball size={50} />,
  },
  {
    value: 'maintenanceSupplies',
    icon: <BiHardHat size={50} />,
  },
  {
    value: 'libraryInventory',
    icon: <IoLibraryOutline size={50} />,
  },
  {
    value: 'artSupplies',
    icon: <BsBrush size={50} />,
  },
  {
    value: 'musicalInstruments',
    icon: <PiGuitar size={50} />,
  },
  {
    value: 'cafeteriaSupplies',
    icon: <IoCafeOutline size={50} />,
  },
  {
    value: 'uniformsAndApparel',
    icon: <GiClothes size={50} />,
  },
];
