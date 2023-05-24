import { createContext, useContext, useState } from "react";

export const ListingContext = createContext();

export const useListing = () => useContext(ListingContext);

export default function ListingProvider({ children }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState();
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState();
  const [tags, setTags] = useState([]);
  const [video_url, setVideo_url] = useState();
  const [image_urls, setImage_urls] = useState([]);

  return (
    <ListingContext.Provider
      value={{
        name,
        setName,
        description,
        setDescription,
        video,
        setVideo,
        images,
        setImages,
        price,
        setPrice,
        tags,
        setTags,
        video_url,
        setVideo_url,
        image_urls,
        setImage_urls,
      }}
    >
      {children}
    </ListingContext.Provider>
  );
}
