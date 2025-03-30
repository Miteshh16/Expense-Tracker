import React, { useRef, useState } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      <div className="relative">
        {/* Profile Image or Placeholder */}
        <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden border border-gray-400">
          {previewUrl ? (
            <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <LuUser className="text-gray-600 text-5xl" />
          )}
        </div>

        {/* Circular Pink Upload Button */}
        <button
          onClick={onChooseFile}
          className="absolute bottom-0 right-0 bg-pink-500 text-white p-2 rounded-full shadow-md hover:bg-pink-600 transition flex items-center justify-center"
        >
          <LuUpload size={18} />
        </button>

        {/* Remove Button */}
        {previewUrl && (
          <button
            onClick={handleRemoveImage}
            className="absolute top-0 right-0 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition flex items-center justify-center"
          >
            <LuTrash size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePhotoSelector;
