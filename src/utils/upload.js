import axios from axios;

const upload = async (file)=>{
    const data = new FormData();
    data.append("file",file);
    data.append("upload_preset","PostDost");
    try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dyshds9ia/upload',data);
        // const response = await axios.post('https://api.cloudinary.com/v1_1/dyshds9ia/image/upload',data);
        console.log('Image Uploaded:',response.data);
        const {url} = response.data;
        return url;
    } catch (error) {
        console.error('Image Upload Error:',error);
    }
}
export default upload;