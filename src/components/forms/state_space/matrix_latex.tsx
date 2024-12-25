// @ts-ignore
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Matrix } from "@/types";

// Define the props for the component
interface Props {
  A: Matrix;
  B: Matrix;
  C: Matrix;
  D: Matrix;
}

export default function MatrixLatex({ A, B, C, D }: Props) {
  // const [generatedLatex, setGeneratedLatex] = useState<{ stateSpace: string; output: string } | null>(null);

  const matrixToLatex = (matrix: Matrix) => {
    return (
      "\\begin{pmatrix}" +
      matrix.map((row) => row.join(" & ")).join(" \\\\ ") +
      "\\end{pmatrix}"
    );
  };

  // const generateLatex = () => {
  // setGeneratedLatex({stateSpace:"",output:""})
  const latexA = matrixToLatex(A);
  const latexB = matrixToLatex(B);
  const latexC = matrixToLatex(C);
  const latexD = matrixToLatex(D);

  //     setGeneratedLatex({
  //         stateSpace: `\\dot{x} = ${latexA} x + ${latexB} u`,
  //         output: `y = ${latexC} x + ${latexD} u`,
  //     });
  // };
  const stateSpace = `\\dot{x} = ${latexA} x + ${latexB} u`;
  const output = `y = ${latexC} x + ${latexD} u`;

  // useEffect(() => {
  //     generateLatex();
  // }, []);

  return (
    <div className="text-center mx-auto flex flex-col gap-4">
      <h2 className="text-2xl">State-Space Representation:</h2>
      <div className="grid grid-cols-1 mx-auto">
        <BlockMath math={stateSpace} />
        <BlockMath math={output} />

        {/* <Button onClick={generateLatex}>
                    Generate
                </Button> */}
      </div>
    </div>
  );
}
