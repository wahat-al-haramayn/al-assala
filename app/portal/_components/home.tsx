'use client';

import Image from 'next/image';
export default function Home() {
  return (
    <div className="relative overflow-hidden w-screen h-screen flex justify-center lg:block ">
      {/* Hero section */}
      <div className="pb-80 pt-16 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 lg:static lg:px-8">
          <div className="lg:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 lg:text-6xl">
              مرحبا بك في منصة واحة الحرمين
            </h1>
            <p className="mt-4 text-xl text-gray-500">هذه المنصة مخصصة لإدارة العملاء والطلبات لمتجر واحة الحرمين</p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div
                  dir="ltr"
                  className="absolute transform lg:right-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8"
                >
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg lg:opacity-100">
                        <Image
                          width={1080}
                          height={1350}
                          alt=""
                          src="/img/hero-4.jpg"
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                          width={1080}
                          height={1350}
                          alt=""
                          src="/img/hero-2.jpg"
                          className="size-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                          width={1080}
                          height={1350}
                          alt=""
                          src="/img/hero-3.jpg"
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                          width={1080}
                          height={1350}
                          alt=""
                          src="/img/hero-1.jpg"
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                          width={1080}
                          height={1350}
                          alt=""
                          src="/img/hero-5.jpg"
                          className="size-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                          width={1080}
                          height={1350}
                          alt=""
                          src="/img/hero-6.jpg"
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                          width={1080}
                          height={1350}
                          alt=""
                          src="/img/hero-7.jpg"
                          className="size-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <Button
                variant="outline"
                onClick={() => {
                  redirect("/sign-in");
                }}
                          >
                                                            
                تسجيل الدخول
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
