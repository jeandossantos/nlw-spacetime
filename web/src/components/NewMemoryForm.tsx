'use client';

import { Camera } from 'lucide-react';
import MediaPicker from './MediaPicker';
import { FormEvent } from 'react';
import { api } from '@/lib/api';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function NewMemoryForm() {
  const router = useRouter();

  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const fileToUpload = formData.get('coverUrl');

    if (fileToUpload) {
      const uploadFormData = new FormData();
      uploadFormData.set('upload', fileToUpload);

      const uploadResponse = await api.post('/upload', uploadFormData);

      const { fileUrl: coverUrl } = uploadResponse.data;
      const token = Cookie.get('token');

      await api.post(
        '/memories',
        {
          coverUrl,
          content: formData.get('content'),
          isPublic: formData.get('isPublic'),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      router.push('/');
    }
  }

  return (
    <form onSubmit={handleCreateMemory} className="flex flex-col flex-1 gap-2">
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex gap-1.5 items-center cursor-pointer text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="w-4 h-4" />
          Anexar mídia
        </label>

        <label
          htmlFor="isPublic"
          className="flex gap-1.5 items-center cursor-pointer text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            className="w-4 h-4 text-purple-500 bg-gray-700 border-gray-400 rounded"
          />
          Tornar memória pública
        </label>
      </div>

      <MediaPicker />

      <textarea
        name="content"
        className="flex-1 w-full p-0 text-lg leading-relaxed text-gray-100 bg-transparent border-0 rounded resize-none placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, videos e relatos sobre essa experiência que você quer se lembrar para sempre."
      />
      <button
        type="submit"
        className="self-end px-5 py-3 text-sm font-bold leading-none text-black inline-block uppercase transition-colors bg-green-500 rounded-full font-alt hover:bg-green-600"
      >
        Salvar
      </button>
    </form>
  );
}
