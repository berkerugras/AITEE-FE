import fs from "fs"
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function saveDataUrlAndDeletePrevious(dataUrl, userName, sellerName, marketPlaceUrl) {
    try {
        const replacedUrl = marketPlaceUrl.replace('http://localhost:5000/images', '/public');
        const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
        const uniqueImage = "market-sold-" + Date.now().toString() + "-" + userName + "-" + sellerName + ".png";
        let path = ""
        path = __dirname + "/public/ordered-market-images/" + uniqueImage;
        let deletionPath = __dirname + replacedUrl

        await fs.promises.writeFile(path, base64Data, 'base64');

        fs.unlink(deletionPath, (err) => {
            if (err) {
                console.error(`Error deleting image: ${err}`);
                return;
            }

            console.log('MarketPlace Image deleted successfully.');
        });

        console.log('Image saved successfully:', uniqueImage);
        return "/images/ordered-market-images/" + uniqueImage;


    } catch (error) {
        console.error('Error saving image:', error);
        throw error;
    }
}

export default saveDataUrlAndDeletePrevious;