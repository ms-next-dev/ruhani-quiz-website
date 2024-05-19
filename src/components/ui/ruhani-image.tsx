// Packages
import Image from "next/image";
import React from "react";

// Local Imports
import { cn } from "@/lib/utils";

interface RuhaniQuizProps {
    src: string;
    alt: string;
    className?: string;
    width?: any;
    height?: any;
    fill?: any;
    sizes?: any;
    placeholder: boolean;
    priority?: true | false;
    style?: React.CSSProperties;
}

const RuhaniImage: React.FC<RuhaniQuizProps> = async ({
    alt,
    src,
    style,
    width,
    height,
    sizes,
    fill,
    placeholder,
    priority,
    className,
    ...props
}) => {
    // const buffer = await fetch(src).then(async (res) =>
    //     Buffer.from(await res.arrayBuffer())
    // );

    // const { base64 } = await getPlaiceholder(buffer);
    return (
        <Image
            src={src}
            alt={alt}
            style={style}
            width={width}
            height={height}
            sizes={
                sizes ||
                "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            }
            fill={fill}
            priority={priority}
            // placeholder={placeholder ? "blur" : "empty"}
            // blurDataURL={placeholder ? base64 : ""}
            className={cn(className)}
            loading="lazy"
            {...props}
        />
    );
};

export default RuhaniImage;
