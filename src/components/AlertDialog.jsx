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
        className="max-w-md rounded border border-slate-600 bg-slate-900 p-0 text-white shadow-2xl backdrop:bg-black/70"
      >
        <div className="p-6">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="mt-2 text-sm text-slate-300">{description}</p>
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
