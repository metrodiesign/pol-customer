import Image from "next/image";

/** Header เดียวกับหน้า login — โลโก้วิริยะในกล่องขาวบนแถบน้ำเงิน + tagline. */
export function PayTopNav() {
  return (
    <header className="min-h-[60px] shrink-0 bg-crop-blue">
      <div className="mx-auto flex min-h-[60px] w-full max-w-[1200px] items-stretch justify-center gap-3 px-4 sm:min-h-[70px] sm:gap-4 sm:px-6 md:min-h-[76px] md:gap-6 md:px-8 mlg:min-h-[84px] mlg:px-10">
        <span className="flex shrink-0 items-center bg-white px-3 sm:px-5">
          <Image
            src="/viriyah-logo.png"
            alt="วิริยะประกันภัย"
            width={667}
            height={250}
            priority
            className="h-12 w-auto sm:h-16"
          />
        </span>
        <span className="flex items-center">
          <Image
            src="/fairness-tagline-white.png"
            alt="ความเป็นธรรม คือ พื้นฐาน"
            width={1147}
            height={176}
            className="h-6 w-auto sm:h-8"
          />
        </span>
      </div>
    </header>
  );
}
