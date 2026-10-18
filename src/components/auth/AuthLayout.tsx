
import Image from "next/image";
import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <main
      dir=""
      className="min-h-screen bg-[#222222] p-4 text-white sm:p-6 lg:p-8"
    >
      <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-[1600px] grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
        <section
          dir=""
          className="relative hidden min-h-[580px] overflow-hidden rounded-[36px] border border-white/15 lg:block"
        >
          <Image
            src="/images/Rectangle%206609.png"
            alt="خانه "
            fill
            priority
            sizes="50vw"
            className="object-cover"
           />

          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20" />
          <div className="absolute right-120 top-5 flex items-center gap-1 rounded-2xl bg-[#252525]/90 p-1.5 text-sm backdrop-blur-md">
            <div className="flex gap-2 rounded-xl bg-white px-2 py-3 font-medium text-[#222222]">
              ورود با پسورد
            <Image
            src="/icons/lock%201.png"
            alt="قفل"
            width={14}
            height={4}
            />
            </div>            

            <div className="flex gap-2 px-3 py-3 text-white/70">
              ورود با شماره
            <Image
            src="/icons/phone-call (1) 1.png"
            alt="زنگ"
            width={13}
            height={3}
            />              
            </div>
          </div>

            <div dir="rtl" className="flex justify-between gap-5 w-100">
          <div className="absolute inset-x-4 flex items-center justify- gap-4 rounded-[28px] border border-white/25 bg-[#292929]/85 p-4 shadow-xl backdrop-blur-md sm:inset-x-5 sm:bottom-5 sm:p-5">
            <div className="flex shrink-0  space-x-reverse">
                <div>
                  <Image src='/images/Group 9940.png'
                    alt="گروه"
                    width={150}
                    height={20}                  
                  />
                </div>
            </div>

            <div dir="rtl">
              <p className="text-lg font-bold sm:text-xl">
                بیش از ۵۶۰۰+
              </p>

              <p className="mt-2 text-xs leading-6 text-white/80 sm:text-sm">
                مشتریانی که از خدمات ما لذت برده‌اند!
              </p>
            </div>
          </div>
          <div className=" absolute bottom-5 right-85 ">
            <Image src='/icons/Mask group.png'
              alt="گروه"
              width={320}
              height={30}   
            /> 
          </div>
            </div>

        </section>

        <section className="flex min-w-0 items-center justify-center py-6 sm:py-10 lg:px-5">
          <div className="w-full max-w-[560px]">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
