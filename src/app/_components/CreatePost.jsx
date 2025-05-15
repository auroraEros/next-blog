"use client";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";
import "react-quill-new/dist/quill.snow.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { supabase } from "@/supabase";
import { useUser } from "@clerk/nextjs";
import { ClipLoader } from "react-spinners";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function CreatePost() {
  const { user } = useUser();
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUploadImage = async () => {
    setIsUploading(true);
    setImageUploadError(null);
    setImageUploadProgress(0);

    try {
      if (!file) {
        setImageUploadError("Please select an image");
        setIsUploading(false);
        return;
      }

      if (!file.type.match("image/.*")) {
        setImageUploadError("Only image files are allowed");
        setIsUploading(false);
        return;
      }

      if (file.size > 3 * 1024 * 1024) {
        setImageUploadError("Image size should not exceed 3MB");
        setIsUploading(false);
        return;
      }

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
        onProgress: (progress) => setImageUploadProgress(Math.round(progress)),
      };

      const compressedFile = await imageCompression(file, options);
      setImageUploadProgress(50);

      const fileName = `${uuidv4()}.${compressedFile.type.split("/")[1]}`;
      const filePath = `images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(filePath, compressedFile);

      if (uploadError) throw new Error(uploadError.message);

      setImageUploadProgress(75);

      const {
        data: { publicUrl },
      } = supabase.storage.from("project-images").getPublicUrl(filePath);

      setFormData((prev) => ({ ...prev, image: publicUrl }));
      setImageUploadProgress(100);
    } catch (error) {
      setImageUploadError(error.message || "Image upload failed");
    } finally {
      setTimeout(() => {
        setImageUploadProgress(null);
        setIsUploading(false);
      }, 1000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userMongoId: user?.publicMetadata?.userMongoId,
        }),
      });

      const data = await res.json();

      if (!res.ok) return setPublishError(data.message);

      setPublishError(null);
      router.push(`/post/${data.slug}`);
    } catch (error) {
      setPublishError("Something went wrong");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>

        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile) {
                setFile(selectedFile);
                setImageUploadError(null);
              }
            }}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={isUploading}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>

        {imageUploadError && (
          <Alert color="failure" onDismiss={() => setImageUploadError(null)}>
            {imageUploadError}
          </Alert>
        )}

        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}

        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          onChange={(value) => setFormData({ ...formData, content: value })}
        />

        <Button type="submit" gradientDuoTone="purpleToPink">
          {isSubmitting ?  <ClipLoader color="#ffffff" size={20} className="mr-2" />:"Publish"}
        </Button>

        {publishError && (
          <Alert color="failure" onDismiss={() => setPublishError(null)}>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
