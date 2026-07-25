/**
 * A headline metric displayed in the Statistics section.
 */
export interface Stat {
  id: string;
  /** Numeric value used by the animated counter. */
  value: number;
  /** Optional suffix rendered after the number, e.g. "+", "★". */
  suffix?: string;
  /** Decimal places for fractional values (e.g. 4.9). */
  decimals?: number;
  label: string;
}
