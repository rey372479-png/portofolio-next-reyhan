export default function Footer() {
  const tahun = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-950 p-6 text-center text-slate-300">
      <p>
        &copy; {tahun} M Reyhan Purnomo Putra. Dibuat dengan Next.js.
      </p>
    </footer>
  );
}
