import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PhotoCard({
  title,
  media,
  date_taken,
  link,
  author,
}: PhotosProps) {
  //DATE FORMATTING
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
      ? title.substring(0, 15)
      : title
    : "Photo";

  function extractAuthorName(author: string): string {
    const match = author.match(/\("([^"]*)"\)/);
    return match ? match[1] : "";
  }

  //ANIMATION VARIANTS
  const cardVariants = {
    initial: {
      scale: 0.95,
      opacity: 0.5,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      scale: 0.95,
      backgroundColor: "#39FF14",
    },
  };

  const titleVariants = {
    initial: {
      x: 0,
    },
    hover: {
      x: 10,
    },
  };

  const imageVariants = {
    initial: {
      scale: 1,
    },
    hover: {
      scale: 0.96,
    },
  };

  return (
    <motion.div
      className="flex flex-col border-2 border-r-4 border-black"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      <Link href={link}>
        <motion.div
          variants={imageVariants}
          className="m-8 w-48 h-48 md:w-64 md:h-64 relative overflow-hidden border-2 border-black bg-gray-300 "
        >
          <Image
            src={media.m}
            alt={title}
            fill
            sizes="100%"
            className="object-cover w-full h-full"
          />
        </motion.div>
      </Link>

      <div className="flex justify-between items-center py-2 px-4 border-t-2 border-b-2 border-black">
        <p>{formatDate(date_taken)}</p>
        <p>{formatTime(date_taken)}</p>
      </div>
      <motion.div
        className="flex justify-start items-center min-h-16 py-4 px-4 text-xl"
        variants={titleVariants}
      >
        <p>{trimmedTitle}</p>
      </motion.div>
      <div className="flex text-sm justify-end items-center py-2 px-4 border-b-2 border-t-2 border-black opacity-70">
        <p>{extractAuthorName(author)}</p>
      </div>
    </motion.div>
  );
}
