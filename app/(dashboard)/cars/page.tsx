"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shared/tabs";
import { File } from "lucide-react";
import { Button } from "@/components/shared/button";
import { CarTable } from "@/components/cars/car-table";
import gatewayService from "@/lib/services/GatewayService";
import { useQuery } from "@tanstack/react-query";

const CarPage = () => {
  const { data: cars } = useQuery({
    queryKey: ["CARS"],
    queryFn: () => gatewayService.getCars({ page: 1, limit: 10 }),
    staleTime: 10 * 60, // 10 minutes
    refetchInterval: 60 * 60, // 1 hour
  });

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add New
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <CarTable cars={cars} />
      </TabsContent>
    </Tabs>
  );
};

export default CarPage;
