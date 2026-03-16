# Mortgage Calculator

Calculate monthly mortgage payments including principal, interest, property tax, and insurance, with a payment breakdown bar and bidirectional down payment sync, entirely in the browser.

**Live Demo:** https://file-converter-free.com/en/calculators/mortgage-calculator

## How It Works

Principal and interest (P&I) are computed with the standard PMT formula: `PI = loanAmount * (r*(1+r)^n) / ((1+r)^n - 1)` where `loanAmount = homePrice - downPayment`, `r = annualRate/12/100`, and `n = years*12`. Monthly property tax is `homePrice * taxRate / 100 / 12` and monthly insurance is `insuranceAnnual / 12`. Total monthly payment is `PI + tax + insurance`. The down payment and down payment percentage fields are kept in sync bidirectionally: changing the amount recalculates the percentage and vice versa. A visual breakdown bar renders each component as a proportional colored segment of the total payment.

## Features

- PMT-based P&I: `loanAmount * (r*(1+r)^n) / ((1+r)^n-1)`
- Property tax and insurance added to monthly total
- Bidirectional down payment amount ↔ percentage sync
- Visual payment breakdown bar (P&I / tax / insurance proportions)
- Total payment, total interest, and total cost over loan term

## Browser APIs Used

- (No external APIs — pure DOM arithmetic)

## Code Structure

| File | Description |
|------|-------------|
| `mortgage-calculator.js` | PMT P&I formula, tax/insurance monthly addition, down payment bidirectional sync, breakdown bar proportional rendering |

## Usage

| Element ID / Selector | Purpose |
|----------------------|---------|
| `#mgcPrice` | Home price input |
| `#mgcDown` | Down payment amount input |
| `#mgcDownPct` | Down payment percentage input |
| `#mgcRate` | Annual interest rate |
| `#mgcYears` | Loan term in years |
| `#mgcTax` | Annual property tax rate (%) |
| `#mgcInsurance` | Annual insurance amount |
| `#mgcCalc` | Calculate button |
| `#mgcMonthly` | Total monthly payment |
| `#mgcPI`, `#mgcTaxMonth`, `#mgcInsMonth` | Payment component displays |
| `#mgcBreakdown` | Visual breakdown bar |
| `#mgcTotalInterest`, `#mgcTotalCost` | Loan-term totals |

## License

MIT
