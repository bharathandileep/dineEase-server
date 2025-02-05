
export const convertFileToBase64 = (file: any): string => {
    return file.buffer.toString('base64');
  };