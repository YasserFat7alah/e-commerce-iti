// uploader.js
export class ImageUploader {
    constructor(apiKey) {
        if (!apiKey) {
            throw new Error("ImgBB API key is required");
        }
        this.apiKey = apiKey;
    }

    /**
     * Upload a single image to ImgBB
     * @param {File} file - File object
     * @returns {Promise<string>} - Uploaded image URL
     */
    async uploadImage(file) {
        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch(
            `https://api.imgbb.com/1/upload?key=${this.apiKey}`,
            {
                method: "POST",
                body: formData,
            }
        );

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Upload failed: ${errText}`);
        }

        const data = await response.json();
        return data.data.url;
    }

    /**
     * Upload multiple images to ImgBB
     * @param {File[]} files - Array of File objects
     * @returns {Promise<string[]>} - Array of uploaded image URLs
     */
    async uploadImages(files) {
        const urls = [];
        for (const file of files) {
            const url = await this.uploadImage(file);
            urls.push(url);
        }
        return urls;
    }
}

//ready-to-use uploader instance
export const uploader = new ImageUploader("3506ee71f448f861fd2d0f554c894493");