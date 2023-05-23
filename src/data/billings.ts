export type Billing = 'year' | 'month'

export const discount = 25

export const monthsCount: Record<Billing, number> = {
	year: 12 * (1 - discount * 0.01),
	month: 1
}
