import { Separator } from "./ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface Props {
  caption: string;
  data: { key: string; value: number }[];
}

export default function DataTable({ caption, data }: Props) {
  return (
    <Table>
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow className="flex items-center">
          <TableHead className="flex-1 flex justify-center">
            <span className="w-40 font-bold">Property</span>
          </TableHead>
          <Separator orientation="vertical" />
          <TableHead className="flex-1 flex justify-center">
            <span className="w-40 font-bold">Value</span>
          </TableHead>
          {/* <TableHead>Status</TableHead> */}
          {/* <TableHead>Method</TableHead> */}
          {/* <TableHead className="text-right">Amount</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow className="flex items-center">
            <TableCell className="font-medium flex justify-center flex-1">
              <span className="w-40">{row.key}</span>
            </TableCell>
            <Separator orientation="vertical" />
            <TableCell className="flex justify-center flex-1">
              <span className="w-40">{row.value}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
