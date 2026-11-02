export default function Footer() {
  const tahun = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-[#203b5d] p-6 text-center text-white">
      <p>
        &copy; {tahun} M Reyhan Purnomo Putra. Dibuat dengan Next.js.
      </p>
    </footer>
  );
}
