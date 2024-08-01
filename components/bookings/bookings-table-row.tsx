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
import { Shipment, ShippingStatus } from "@/lib/types/common";

export function ShipmentTableRow({ shipment }: { shipment: Shipment }) {
  return (
    <TableRow>
      <TableCell className="font-medium">{shipment.id}</TableCell>
      <TableCell className="hidden md:table-cell">{`${shipment.carId}`}</TableCell>
      <TableCell className="hidden md:table-cell">{`${shipment.user.name}`}</TableCell>
      <TableCell className="hidden md:table-cell">
        {shipment.pickupLocation}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {shipment.deliveryLocation}
      </TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={`${
            shipment.status === ShippingStatus.DELIVERED
              ? "bg-green-500"
              : shipment.status === ShippingStatus.IN_TRANSIT
              ? "bg-cyan-700"
              : "bg-yellow-300"
          } capitalize`}
        >
          {shipment.status}
        </Badge>
      </TableCell>
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
