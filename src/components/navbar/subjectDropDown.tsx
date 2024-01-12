// Packages
import { Subject } from "@prisma/client";
import { BookCheck, BookUser } from "lucide-react";
import Link from "next/link";

// Local Imports
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SubjectDropDownProps {
    subjects: Subject[];
}

const SubjectDropDown: React.FC<SubjectDropDownProps> = ({ subjects }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <span className="w-full lg:w-min cursor-pointer text-[15px] text-left lg:text-center lg:hover:text-[#FF004C] p-3 lg:p-0 hover:bg-[#FF004C]/25 lg:hover:bg-transparent rounded-xl duration-500 flex items-center">
                    <BookUser className="lg:hidden mr-2 h-4 w-4" />
                    Subjects
                </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44 bg-white -mt-2 lg:mt-5 -ml-28 md:-ml-80 lg:ml-20">
                <DropdownMenuGroup>
                    {subjects.length > 0 &&
                        subjects.map((subject) => (
                            <DropdownMenuItem
                                key={subject.id}
                                className="hover:bg-[#ff004c22] duration-500 cursor-pointer"
                            >
                                <Link
                                    href={`/subjects/${subject.id}`}
                                    className="text-[15px] hover:text-[#FF004C] flex items-center p-1 duration-300"
                                >
                                    <BookCheck className="mr-2 h-4 w-4" />
                                    <span>{subject.name}</span>
                                </Link>
                            </DropdownMenuItem>
                        ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default SubjectDropDown;
