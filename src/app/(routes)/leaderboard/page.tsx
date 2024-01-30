import RuhaniImage from "@/components/ui/ruhani-image";

const Page = () => {
  return (
    <div className="min-h-[80vh]">
      <div className="bg-black/90 h-[220px] md:h-[300px] w-full flex justify-center items-center">
        <div className="flex flex-col items-center">
          <RuhaniImage
            src="https://res.cloudinary.com/dn2pqzag1/image/upload/v1706361303/trophy_2_vq5dxd.png"
            width={80}
            height={80}
            placeholder={true}
            alt="trophy"
          />
          <h3 className="flex items-center gap-x-2 md:text-[25px] lg:text-[30px] text-white/90">
            <span className="font-semibold">Ruhani Quiz</span>{" "}
            <p>Leaderboard</p>
          </h3>
          <p className="text-gray-400 mt-2">Play quiz and earn score</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
