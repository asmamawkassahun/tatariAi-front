import Image from "next/image";

const ProjectCard = () => {
  return (
    <section className="w-full max-w-[21.375rem] space-y-2.5 p-2.5">
      {/* <div>
        <span className="bg-[#FDD3E7] text-[#960343] px-2 py-1 rounded-[0.375rem] font-medium text-11 leading-[1.125rem]">
          Consumer App
        </span>
      </div> */}
      <div className="space-y-4">
        <div>
          <Image
            src="/image1.jpg"
            width={342}
            height={192}
            alt="site imag"
            className="object-contain rounded-xl"
          />
        </div>
        <div className="flex space-x-1.25">
          {/* avatar */}
          <div className="w-9 h-9  relative inline-block">
            <Image
              src="/image1.jpg"
              width={36}
              height={36}
              alt="avatar"
              className="rounded-full w-9 h-9"
            />
          </div>
          <div className="">
            <h3 className="text-primary dark:text-accent text-sm font-normal leading-6">
              Project Title
            </h3>
            <p className="text-secondary dark:text-muted text-13 leading-5">8031 Remixes </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectCard;
