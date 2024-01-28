import { ModalNameType } from '@/store/slices/modal.slice';

export function generateId(numStrng: string) {
  // Find the index of the last number character in the string
  const numStr = numStrng ?? '';
  let lastIndex = numStr.length - 1;

  // Check if the last character is not a number
  if (lastIndex < 0 || isNaN(parseInt(numStr[lastIndex]))) {
    return numStr + '001';
  }

  while (lastIndex >= 0 && isNaN(parseInt(numStr[lastIndex]))) {
    lastIndex--;
  }

  // Increment the last number character by 1
  const lastNum = parseInt(numStr[lastIndex]);
  const incrementedLastNum = lastNum + 1;

  // Create the updated string by combining the unchanged part with the incremented number
  const updatedStr = numStr.slice(0, lastIndex) + incrementedLastNum.toString();
  return updatedStr;
}

Number.prototype.formatCurrency = function (
  currencyCode = 'ETB',
  minFractionDigits = 2,
  maxFractionDigits = 2
) {
  return this.toLocaleString('en-US', {
    minimumFractionDigits: minFractionDigits,
    maximumFractionDigits: maxFractionDigits,
  });
};

export function generateModalTitle(type: ModalNameType): string {
  return type === 'item'
    ? 'New Item'
    : type === 'vendor'
    ? 'New Vendor'
    : type === 'purchase'
    ? 'New Purchase'
    : '';
}
