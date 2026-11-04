
export default function SkillCard({ nama, level }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h3 className="font-bold text-[#203b5d] dark:text-sky-200">
        {nama}
      </h3>

      <p className="mt-2 text-sm text-[#30435d] dark:text-gray-300">
        Level: {level}
      </p>
    </div>
  );
}
