import Image from "next/image";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/shared/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { TableCell, TableRow } from "@/components/shared/table";
import { Car } from "@/lib/types/common";

export function CarTableRow({ car }: { car: Car }) {
  return (
    <TableRow>
      <TableCell>
        <Badge variant="outline" className="capitalize bg-gray-300">
          {car.make}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{`${car.model}`}</TableCell>
      <TableCell className="hidden md:table-cell">{car.year}</TableCell>
      <TableCell className="hidden md:table-cell">{car.vin}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <form>
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
