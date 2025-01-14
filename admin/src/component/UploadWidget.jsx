import { useEffect, useRef } from "react";

// eslint-disable-next-line react/prop-types
const UploadWidget = ({ setImageUrl }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "drtbromax",
        uploadPreset: "my_preset",
      },
      function (error, result) {
        console.log(result);
        if (result.event === "success") {
          setImageUrl(result.info.secure_url);
        }
      }
    );
  });

  return (
    <button
      className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none mb-4 w-full"
      onClick={() => widgetRef.current.open()}
      type="button"
    >
      Upload Image
    </button>
  );
};

export default UploadWidget;
