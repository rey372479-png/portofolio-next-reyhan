
export default function SkillCard({ nama, level }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="font-bold text-[#203b5d]">
        {nama}
      </h3>

      <p className="mt-2 text-sm text-[#30435d]">
        Level: {level}
      </p>
    </div>
  );
}
