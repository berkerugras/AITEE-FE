import fs from "fs"
import path from 'path'
import { fileURLToPath } from 'url';
import axios from "axios";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getImageService(imageUrl) {
    try {
        const response = await axios.get(imageUrl, {
          responseType: 'arraybuffer', 
        });
    
        const imageBuffer = Buffer.from(response.data, 'binary');
        const imageDataUrl = `data:${response.headers['content-type']};base64,${imageBuffer.toString('base64')}`;
    
        return imageDataUrl;
      } catch (error) {
        console.error('Error fetching image:', error);
        throw error;
      }
}

export default getImageService;