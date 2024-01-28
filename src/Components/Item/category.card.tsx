import React from 'react';
import { categoriesWithIcons } from './categoryIcons';
import { categoryOptions } from './item.utils';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/router/constants';

type categoryCardProps = {
  category: string;
};

const CategoryCard: React.FC<categoryCardProps> = ({ category }) => {
  const navigate = useNavigate();
  const { items } = useSelector((state: RootState) => state.data);
  const title = categoryOptions.find((cat) => cat.value === category)?.label;
  const Icon = categoriesWithIcons.find((cat) => cat.value === category)?.icon;
  const numOfItems = items.filter((item) =>
    item.category?.includes(category)
  ).length;
  return (
    <div
      className='category-tile'
      onClick={() => navigate(`${ROUTES.INVENTORY + '?category=' + category}`)}
    >
      <span className='text-lg font-semibold text-gray-500'>{title}</span>
      <div className='category-data-container'>
        {Icon} <div className='category-value'>{numOfItems.formatNumber()}</div>
      </div>
    </div>
  );
};
export default CategoryCard;
