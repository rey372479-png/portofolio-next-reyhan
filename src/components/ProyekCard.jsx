import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProyekCard({ proyek }) {
  return (
    <Card className="overflow-hidden transition hover:-translate-y-1 hover:shadow-md">
      {proyek.gambar_url ? (
        <Image
          src={proyek.gambar_url}
          alt={`Gambar proyek ${proyek.judul}`}
          width={640}
          height={420}
          loading="eager"
          className="h-auto w-full"
        />
      ) : null}
      <Link href={`/proyek/${proyek.slug}`} className="block">
        <CardHeader>
          <Badge>{proyek.kategori}</Badge>
          <CardTitle className="mt-3 text-lg">{proyek.judul}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{proyek.deskripsi}</p>
          <p className="mt-3 text-xs font-medium">
            {proyek.fitur?.join(" · ")}
          </p>
        </CardContent>
      </Link>
    </Card>
  );
}
