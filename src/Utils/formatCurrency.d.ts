declare global {
  interface Number {
    formatCurrency(
      currencyCode?: string,
      minFractionDigits?: number,
      maxFractionDigits?: number
    ): string;
  }
}

export {};
