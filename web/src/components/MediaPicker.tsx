'use client';

import { ChangeEvent, useState } from 'react';

export default function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null);

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    if (!files) {
      return;
    }

    setPreview(URL.createObjectURL(files[0]));
  }

  return (
    <>
      <input
        type="file"
        id="media"
        name="coverUrl"
        className="w-0 h-0 invisible"
        onChange={onFileSelected}
      />

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="w-full object-cover rounded-lg aspect-video"
        />
      )}
    </>
  );
}
