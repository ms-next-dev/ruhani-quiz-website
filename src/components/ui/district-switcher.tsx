"use client";
// Packages
import { User } from "@prisma/client";
import { Check, ChevronsUpDown, MapPin } from "lucide-react";
import React, { useState } from "react";

// Local Imports
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "./button";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface DistrictSwitcherProps extends PopoverTriggerProps {
  className?: any;
  user: User;
  field: any;
  isPending?: boolean;
}

const districtLists = [
  { label: "Dhaka", value: "Dhaka" },
  { label: "Chittagong", value: "Chittagong" },
  { label: "Khulna", value: "Khulna" },
  { label: "Rajshahi", value: "Rajshahi" },
  { label: "Barisal", value: "Barisal" },
  { label: "Sylhet", value: "Sylhet" },
  { label: "Rangpur", value: "Rangpur" },
  { label: "Comilla", value: "Comilla" },
  { label: "Mymensingh", value: "Mymensingh" },
  { label: "Jessore", value: "Jessore" },
  { label: "Cox's Bazar", value: "Cox's Bazar" },
  { label: "Bogra", value: "Bogra" },
  { label: "Dinajpur", value: "Dinajpur" },
  { label: "Narayanganj", value: "Narayanganj" },
  { label: "Feni", value: "Feni" },
  { label: "Kushtia", value: "Kushtia" },
  { label: "Joypurhat", value: "Joypurhat" },
  { label: "Narsingdi", value: "Narsingdi" },
  { label: "Tangail", value: "Tangail" },
  { label: "Lakshmipur", value: "Lakshmipur" },
  { label: "Jhenaidah", value: "Jhenaidah" },
  { label: "Pabna", value: "Pabna" },
  { label: "Nawabganj", value: "Nawabganj" },
  { label: "Munshiganj", value: "Munshiganj" },
  { label: "Jamalpur", value: "Jamalpur" },
  { label: "Manikganj", value: "Manikganj" },
  { label: "Satkhira", value: "Satkhira" },
  { label: "Sirajganj", value: "Sirajganj" },
  { label: "Faridpur", value: "Faridpur" },
  { label: "Chandpur", value: "Chandpur" },
  { label: "Thakurgaon", value: "Thakurgaon" },
  { label: "Kishoreganj", value: "Kishoreganj" },
  { label: "Magura", value: "Magura" },
  { label: "Sherpur", value: "Sherpur" },
  { label: "Habiganj", value: "Habiganj" },
  { label: "Meherpur", value: "Meherpur" },
  { label: "Netrokona", value: "Netrokona" },
  { label: "Rangamati", value: "Rangamati" },
  { label: "Kurigram", value: "Kurigram" },
  { label: "Bhola", value: "Bhola" },
  { label: "Chapainawabganj", value: "Chapainawabganj" },
  { label: "Noakhali", value: "Noakhali" },
  { label: "Chuadanga", value: "Chuadanga" },
  { label: "Lalmonirhat", value: "Lalmonirhat" },
  { label: "Gaibandha", value: "Gaibandha" },
  { label: "Pirojpur", value: "Pirojpur" },
  { label: "Bandarban", value: "Bandarban" },
  { label: "Bagerhat", value: "Bagerhat" },
  { label: "Shariatpur", value: "Shariatpur" },
  { label: "Satkania", value: "Satkania" },
  { label: "Kalaroa", value: "Kalaroa" },
  { label: "Kuakata", value: "Kuakata" },
  { label: "Patuakhali", value: "Patuakhali" },
  { label: "Barguna", value: "Barguna" },
  { label: "Kapasia", value: "Kapasia" },
  { label: "Gopalganj", value: "Gopalganj" },
  { label: "Bakerganj", value: "Bakerganj" },
  { label: "Chaugachha", value: "Chaugachha" },
  { label: "Panchagarh", value: "Panchagarh" },
  { label: "Kaliganj", value: "Kaliganj" },
  { label: "Birganj", value: "Birganj" },
  { label: "Bhelashahar", value: "Bhelashahar" },
  { label: "Daulatkhan", value: "Daulatkhan" },
  { label: "Kotchandpur", value: "Kotchandpur" },
];

const DistrictSwitcher: React.FC<DistrictSwitcherProps> = ({
  className,
  user,
  field,
  isPending,
}) => {
  const [currentDistrict, setCurrentDistrict] = useState(
    districtLists.find((item) => item.value === user.district)
  );
  const [open, setOpen] = useState(false);

  const onSubjectSelect = (district: { value: string; label: string }) => {
    setOpen(false);
    setCurrentDistrict(district);
    field.onChange(district.value);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          role="combobox"
          disabled={isPending}
          aria-expanded={open}
          aria-label="Select a store"
          className={cn("w-full justify-between border-gray-700", className)}
        >
          <MapPin className="mr-2 h-4 w-4" />
          {currentDistrict?.label || "Select a district"}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full bg-white">
        <Command className="w-full">
          <CommandList className="w-full">
            <CommandInput placeholder="search..." />
            <CommandEmpty>No district found.</CommandEmpty>
            <CommandGroup heading="District">
              {districtLists.map((district) => (
                <CommandItem
                  disabled={isPending}
                  key={district.value}
                  onSelect={() => onSubjectSelect(district)}
                  className="text-sm cursor-pointer"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  {district.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4 ",
                      currentDistrict?.value === district.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default DistrictSwitcher;
