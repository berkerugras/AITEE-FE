import fs from "fs"
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function saveDataUrlImage(dataUrl, userName, marketplaceFlag) {
    try {
        const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
        const uniqueImage = "uniqueImage-" + Date.now().toString() + "-" + userName + ".png";
        let path = ""
        if (marketplaceFlag) {
            path = __dirname + "/public/marketplace-images/" + uniqueImage;
        }
        else {
            path = __dirname + "/public/ordered-images/" + uniqueImage;
        }
        await fs.promises.writeFile(path, base64Data, 'base64');
        console.log('Image saved successfully:', uniqueImage);
        if (marketplaceFlag) {
            return "/images/marketplace-images/" + uniqueImage;
        }
        else {
            return "/images/ordered-images/" + uniqueImage;
        }

    } catch (error) {
        console.error('Error saving image:', error);
        throw error;
    }
}

export default saveDataUrlImage;