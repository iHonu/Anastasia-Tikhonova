import Image from "next/image";

export default function PhotoCard({ title, media, date_taken }: PhotosProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="w-48 h-48 relative overflow-hidden ">
        <Image
          src={media.m}
          alt={title}
          fill
          sizes="100%"
          className="object-cover w-full h-full"
        />
      </div>
      <p>{title}</p>
    <p>{date_taken}</p>
    </div>
  );
}
