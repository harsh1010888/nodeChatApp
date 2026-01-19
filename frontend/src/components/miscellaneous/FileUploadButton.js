import { useRef, useState } from "react";
import { IconButton, useToast } from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

// Props:
// - onUploadComplete: (fileInfo) => void
//   fileInfo = { url, publicId, originalFilename, bytes, resourceType, format }
const FileUploadButton = ({ onUploadComplete }) => {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const toast = useToast();

  const handleClick = () => {
    if (uploading) return;
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset the input so selecting the same file again works
    event.target.value = "";

    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast({
        title: "File too large",
        description: "Maximum upload size is 5 MB.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      // Upload to backend
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      if (onUploadComplete) {
        onUploadComplete({
          url: data.url,
          filename: data.filename,
          mimetype: data.mimetype,
          size: data.size,
        });
      }

      toast({
        title: "File uploaded successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description:
          error?.message || "An error occurred while uploading the file.",
        status: "error",
        duration: 6000,
        isClosable: true,
        position: "bottom-left",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <IconButton
        aria-label="Attach file"
        icon={<AttachmentIcon />}
        size="sm"
        variant="ghost"
        colorScheme="blue"
        onClick={handleClick}
        isLoading={uploading}
      />
    </>
  );
};

export default FileUploadButton;
