// @ts-ignore
import { BlockMath } from "react-katex";

const generateLatex = (num: number[], den: number[]) => {
  const formatPolynomial = (coeffs: number[]): string =>
    coeffs
      .map((coef, i) => {
        const power = coeffs.length - i - 1;
        if (coef === 0) return ""; // Skip zero coefficients
        if (power === 0) return `${coef}`; // Constant term
        if (power === 1) return `${coef}s`; // Linear term
        return `${coef}s^{${power}}`; // Higher-order terms
      })
      .filter((term) => term !== "") // Remove empty terms
      .join(" + ")
      .replace(/\+ -/g, "- "); // Fix formatting for negative terms

  const numerator = formatPolynomial(num);
  const denominator = formatPolynomial(den);

  return `TF(s) = \\frac{${numerator}}{${denominator}}`;
};

export default function TransferFunctionLatex({
  num,
  den,
  showLabel = true,
}: {
  num: number[];
  den: number[];
  showLabel: boolean;
}) {
  const latex = generateLatex(num, den);
  return (
    <div className="flex items-center w-full justify-center">
      {showLabel && <h2 className="text-2xl">Transfer Function:</h2>}
      <div className="flex-1 flex items-center justify-center">
        <BlockMath>{latex}</BlockMath>
      </div>
    </div>
  );
}
