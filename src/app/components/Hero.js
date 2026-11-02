
import Image from "next/image";

export default function Hero({ nama, tagline }) {
  return (
    <section className="mb-10 flex flex-col items-center gap-6 md:flex-row md:gap-7">
      <Image
        src="/foto-reyhan.jpeg"
        alt="Foto M Reyhan Purnomo Putra"
        width={176}
        height={176}
        loading="eager"
        className="h-44 w-44 shrink-0 rounded-full border-4 border-rose-600 object-cover"
      />

      <div>
        <h1 className="text-3xl font-bold leading-tight text-[#203b5d] sm:text-4xl md:text-5xl">
          Halo, saya {nama}!
        </h1>
        <p className="mt-3 text-base text-[#203b5d] sm:text-lg">
          {tagline}
        </p>
      </div>
    </section>
  );
}
