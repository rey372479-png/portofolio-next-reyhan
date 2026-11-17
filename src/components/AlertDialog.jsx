"use client";

import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

function ConfirmButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" disabled={pending}>{pending ? "Menghapus..." : "Ya, hapus"}</Button>;
}

export default function AlertDialog({ children, title, description, action, fields }) {
  const dialogRef = useRef(null);

  return (
    <>
      <span onClick={() => dialogRef.current?.showModal()}>{children}</span>
      <dialog
        ref={dialogRef}
        aria-modal="true"
        className="max-w-md rounded-xl border border-gray-200 bg-white p-0 text-[#203b5d] shadow-xl backdrop:bg-black/50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
      >
        <div className="p-6">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="mt-2 text-sm text-[#30435d] dark:text-gray-300">{description}</p>
          <form action={action} className="mt-6 flex justify-end gap-3">
            {fields}
            <Button type="button" variant="outline" onClick={() => dialogRef.current?.close()}>Batal</Button>
            <ConfirmButton />
          </form>
        </div>
      </dialog>
    </>
  );
}
