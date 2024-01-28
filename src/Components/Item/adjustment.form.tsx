import { IDischarge } from '@/Interface/Item/item.interface';
import { IPurchase } from '@/Interface/Purchase/purchase.interface';
import { Segmented } from 'antd';
import React, { useState } from 'react';
import PurchaseForm from '../Purchase/form.purchase';
import ItemDischargeForm from './form.item.discharge';

type adjustmentFormProps = {
  type: 'purchase' | 'discharge';
  item: IPurchase | IDischarge;
};

const AdjustmentForm: React.FC<adjustmentFormProps> = ({ item, type }) => {
  const [selectedType, setSelectedType] = useState<'purchase' | 'discharge'>(
    type ?? 'purchase'
  );
  const handletypeChange = (value: 'purchase' | 'discharge') => {
    setSelectedType(value);
  };
  return (
    <div className='adjustment-form-container'>
      <div className='w-full mb-4'>
        <Segmented
          options={[
            {
              label: 'Addition',
              value: 'purchase',
            },
            {
              label: 'Discharge',
              value: 'discharge',
            },
          ]}
          value={selectedType}
          onChange={(value) =>
            handletypeChange(value.toString() as 'purchase' | 'discharge')
          }
          disabled={item !== null}
          size='large'
          block
        />
      </div>
      {selectedType === 'purchase' ? (
        <PurchaseForm item={item as IPurchase} />
      ) : (
        <ItemDischargeForm item={item as IDischarge} />
      )}
    </div>
  );
};
export default AdjustmentForm;
