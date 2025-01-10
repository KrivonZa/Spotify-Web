type RGB = { r: number; g: number; b: number };

export const processImageAndSetBackground = async (url: string): Promise<RGB | null> => {
    try {
      const base64 = await toDataURL(url);
      if (!base64) {
        throw new Error("Failed to convert image to Base64");
      }
  
      const img = new Image();
      img.src = base64 as string;
  
      return new Promise<RGB | null>((resolve, reject) => {
        img.onload = () => {
          const rgb = getAverageRGB(img);
          document.body.style.backgroundColor = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
          resolve(rgb); // Trả về RGB
        };
  
        img.onerror = () => {
          console.error("Failed to load the image for RGB calculation.");
          reject(null);
        };
      });
    } catch (error) {
      console.error("Error processing the image:", error);
      return null;
    }
  };

const toDataURL = (url: string): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      })
      .catch(reject);
  });
};

const getAverageRGB = (imgEl: HTMLImageElement): RGB => {
  const blockSize = 5; // Only visit every 5 pixels
  const defaultRGB: RGB = { r: 0, g: 0, b: 0 }; // Default for unsupported environments
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    return defaultRGB;
  }

  const width = canvas.width = imgEl.naturalWidth || imgEl.width;
  const height = canvas.height = imgEl.naturalHeight || imgEl.height;
  context.drawImage(imgEl, 0, 0, width, height);

  try {
    const data = context.getImageData(0, 0, width, height).data;
    const rgb = { r: 0, g: 0, b: 0 };
    let count = 0;

    for (let i = 0; i < data.length; i += blockSize * 4) {
      rgb.r += data[i];
      rgb.g += data[i + 1];
      rgb.b += data[i + 2];
      count++;
    }

    // Calculate the average and return
    rgb.r = Math.floor(rgb.r / count);
    rgb.g = Math.floor(rgb.g / count);
    rgb.b = Math.floor(rgb.b / count);
    return rgb;
  } catch (e) {
    console.error("Error calculating RGB:", e);
    return defaultRGB;
  }
};
