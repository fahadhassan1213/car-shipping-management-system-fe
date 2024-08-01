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
import { CarTableRow } from "./car-table-row";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/shared/button";
import { CarsResponse } from "@/lib/types/common";

export function CarTable({ cars }: { cars: CarsResponse | undefined }) {
  const start = ((cars?.page || 1) - 1) * (cars?.limit || 10) + 1;
  const end = Math.min(
    (cars?.page || 1) * (cars?.limit || 10),
    cars?.total || 0
  );

  function prevPage() {}

  function nextPage() {}

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Cars</CardTitle>
        <CardDescription>
          Manage your cars and view their details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {cars?.data && (
          <Table>
            <TableHeader>
              <TableRow>
                {/* <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead> */}
                <TableHead>Make</TableHead>
                <TableHead className="hidden md:table-cell">Model</TableHead>
                <TableHead className="hidden md:table-cell">Year</TableHead>
                <TableHead className="hidden md:table-cell">Vin</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cars.data.map((car) => (
                <CarTableRow key={car.id} car={car} />
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing {start}-{end} of {cars?.total} cars
          </div>

          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={(cars?.page || 1) === 1}
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
                cars?.page === (cars?.total || 0) / 10 ||
                (cars?.total || 0) < (cars?.limit || 10)
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
