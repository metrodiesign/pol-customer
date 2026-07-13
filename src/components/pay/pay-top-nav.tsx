import Image from "next/image";

/** Header เดียวกับหน้า login — โลโก้วิริยะในกล่องขาวบนแถบน้ำเงิน + tagline. */
export function PayTopNav() {
  return (
    <header className="flex min-h-[60px] shrink-0 items-stretch gap-3 bg-crop-blue pr-4 sm:min-h-[70px] sm:gap-4 sm:pr-6">
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
    </header>
  );
}
