import Link from "next/link";
import Image from "next/image";

export default function PhotoCard({
  title,
  media,
  date_taken,
  link,
  author,
}: PhotosProps) {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const trimmedTitle = title
    ? title.length > 15
      ? title.substring(0, 20)
      : title
    : "No title";

  function extractAuthorName(author: string): string {
    const match = author.match(/\("([^"]*)"\)/);
    return match ? match[1] : "";
  }

  return (
    <div className="flex flex-col  border-2 border-r-4 border-black hover:scale-95 ease-out duration-100  hover:bg-orange-500">
        <div className="m-8 w-64 h-64 relative overflow-hidden border-2 border-black  ">
        <Link href={link}>
          <Image
            src={media.m}
            alt={title}
            fill
            sizes="100%"
            className="object-cover w-full h-full"
          />
        </Link>
      </div>
      <div className="flex justify-between items-center py-2 px-4 border-t-2 border-b-2 border-black">
      <p>{formatDate(date_taken)}</p>
      <p>{formatTime(date_taken)}</p>
      </div>
      <div className="flex justify-start items-center py-4 px-4 hover:font-semibold text-xl border-b-2 border-black ">
      <p >{trimmedTitle}</p>

      </div>
      <div className="flex text-sm justify-end items-center py-2 px-4 border-b-2 border-black opacity-70">
      <p>{extractAuthorName(author)}</p>

      </div>

      
      

     
    </div>
  );
}
