import cn from "clsx";

const HomeSection = ({
  display,
  text1,
  text2,
  colorText2,
  bgImage,
  bgColor,
  btntext,
  btnColor,
  txtBtnColor,
  margin,
  Icon,
  iconProps,
}) => {
  return (
    <section
      className={cn(
        "h-[70vh] w-full overflow-hidden rounded-2xl border",
        margin,
        display,
        "sm:h-[50vh]",
        "md:h-[65vh] md:max-h-[504px]",
      )}
    >
      <div
        className={cn(
          "relative flex h-[50%] w-full flex-col justify-center gap-10 p-5 text-xl font-bold text-blue-100",
          bgColor,
          "sm:p-10 sm:text-2xl",
          "md:h-full md:w-[60%] md:gap-10 md:p-10 md:text-[2rem] md:leading-none lg:p-20",
        )}
      >
        <Icon color="#ffffff" className={cn("absolute w-[40%]", iconProps) } />

        <p className="relative">{text1}</p>
        <p className={cn("relative", colorText2)}>{text2}</p>

        {/*----desktop button ----*/}
        <button
          className={cn(
            "btn glass float-right hidden w-[50%] text-lg font-bold",
            btnColor,
            txtBtnColor,
            "md:block",
          )}
        >
          {btntext}
        </button>
      </div>

      <div
        className={cn(
          "relative grid h-[50%] w-full place-items-center bg-cover bg-center bg-no-repeat p-4",
          "md:h-full md:w-[40%] md:p-8",
        )}
        style={{ backgroundImage: `url(${bgImage.src})` }}
      >
        {/*----mobile button---- */}
        <button
          className={cn(
            "btn glass px-[30px] text-sm font-bold",
            btnColor,
            txtBtnColor,
            "sm:px-[50px] sm:text-lg",
            "md:hidden",
          )}
        >
          {btntext}
        </button>
      </div>
    </section>
  );
};

export default HomeSection;
