
export default function Kartu({ judul, anak }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-2xl font-bold text-[#203b5d]">
        {judul}
      </h2>

      <div className="text-base leading-7 text-[#30435d]">
        {anak}
      </div>
    </section>
  );
}
