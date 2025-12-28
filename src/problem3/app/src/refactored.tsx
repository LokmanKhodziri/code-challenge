import React, { useMemo } from "react";

// --- Interfaces ---
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // Added blockchain to the interface for clarity
}

// Unused, but kept for context from original snippet
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

// Mock custom hooks for demonstration purposes
const useWalletBalances = (): WalletBalance[] => [
  { currency: "ETH", amount: 1.5, blockchain: "Ethereum" },
  { currency: "OSMO", amount: 250, blockchain: "Osmosis" },
  { currency: "ZIL", amount: 5000, blockchain: "Zilliqa" },
  { currency: "NEO", amount: 100, blockchain: "Neo" },
  { currency: "ARB", amount: 2.5, blockchain: "Arbitrum" },
  { currency: "BTC", amount: 0.1, blockchain: "Bitcoin" }, // Example with default priority
  { currency: "ETH", amount: -0.5, blockchain: "Ethereum" }, // Example of a balance to be filtered out
];

const usePrices = (): { [key: string]: number } => ({
  ETH: 4000,
  OSMO: 1.5,
  ZIL: 0.05,
  NEO: 50,
  ARB: 1.2,
  BTC: 60000,
});

// --- Helper function moved outside the component ---
// It doesn't depend on component state, so it doesn't need to be recreated on every render.
const getPriority = (blockchain: string): number => {
  switch (blockchain) {
    case "Osmosis":
      return 100;
    case "Ethereum":
      return 50;
    case "Arbitrum":
      return 30;
    case "Zilliqa":
      return 20;
    case "Neo":
      return 20;
    default:
      return -99;
  }
};

// --- Mock component for WalletRow ---
interface WalletRowProps {
  className: string;
  amount: number;
  usdValue: number;
  formattedAmount: string;
}
const WalletRow: React.FC<WalletRowProps> = ({
  amount,
  usdValue,
  formattedAmount,
}) => (
  <div style={{ border: "1px solid #ccc", padding: "10px", margin: "5px" }}>
    <p>Amount: {amount}</p>
    <p>USD Value: {usdValue.toFixed(2)}</p>
    <p>Formatted Amount: {formattedAmount}</p>
  </div>
);

// --- Component Props ---
interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // Memoize the processed balances to avoid re-calculation on every render.
  // Combines filtering, sorting, and mapping into one loop for efficiency.
  const processedBalances = useMemo(() => {
    return (
      balances
        // 1. Filter out balances with a low priority or non-positive amount.
        .filter((balance) => {
          const priority = getPriority(balance.blockchain);
          // Assuming we want to hide balances with no priority and those with no value.
          return priority > -99 && balance.amount > 0;
        })
        // 2. Sort the remaining balances by their priority.
        .sort((lhs, rhs) => {
          const leftPriority = getPriority(lhs.blockchain);
          const rightPriority = getPriority(rhs.blockchain);
          // Higher priority comes first.
          return rightPriority - leftPriority;
        })
        // 3. Map to the final data structure needed for rendering.
        .map((balance) => {
          const formatted = balance.amount.toFixed();
          const usdValue = prices[balance.currency] * balance.amount;
          return {
            ...balance,
            formatted,
            usdValue,
          };
        })
    );
    // The dependency is only `balances`, since `prices` is used for mapping but doesn't affect filtering or sorting.
    // If prices can change and should trigger a re-render of the values, it should be included.
    // Given the context, we'll include prices as a dependency.
  }, [balances, prices]);

  // Map the processed balances to components. This is now a very cheap operation.
  const rows = processedBalances.map((balance) => (
    <WalletRow
      className='row' // Assuming classes.row is just a string
      // Use a unique and stable key like currency instead of index.
      key={balance.currency}
      amount={balance.amount}
      usdValue={balance.usdValue}
      formattedAmount={balance.formatted}
    />
  ));

  return <div {...rest}>{rows}</div>;
};

export default WalletPage;
