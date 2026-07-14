export interface DataUriResult {
  content: string;
}

export const getDataUri = (file: Express.Multer.File): DataUriResult => {
  if (!file || !file.mimetype || !file.buffer) {
    throw new Error("Invalid file data");
  }

  const fileBuffer = file.buffer.toString("base64");

  return {
    content: `data:${file.mimetype};base64,${fileBuffer}`,
  };
};
