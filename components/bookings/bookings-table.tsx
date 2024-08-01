"use client";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
} from "@/components/shared/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shared/card";
import { ShipmentTableRow } from "./bookings-table-row";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/shared/button";
import { ShipmentResponse } from "@/lib/types/common";

export function ShipmentsTable({
  shipments,
}: {
  shipments: ShipmentResponse | undefined;
}) {
  const start = ((shipments?.page || 1) - 1) * (shipments?.limit || 10) + 1;
  const end = Math.min(
    (shipments?.page || 1) * (shipments?.limit || 10),
    shipments?.total || 0
  );

  function prevPage() {}

  function nextPage() {}

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Shipments</CardTitle>
        <CardDescription>
          Manage your shipments and view their details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {shipments?.data && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shipment Id</TableHead>
                <TableHead>Car Id</TableHead>
                <TableHead>Username</TableHead>
                <TableHead className="hidden md:table-cell">
                  Pickup Location
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Delivery Location
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Shipment Status
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shipments.data.map((shipment) => (
                <ShipmentTableRow key={shipment.id} shipment={shipment} />
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing {start}-{end} of {shipments?.total} cars
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={(shipments?.page || 1) === 1}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={
                shipments?.page === (shipments?.total || 0) / 10 ||
                (shipments?.total || 0) < (shipments?.limit || 10)
              }
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
