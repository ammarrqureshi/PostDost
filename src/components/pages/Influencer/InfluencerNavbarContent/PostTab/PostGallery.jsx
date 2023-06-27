import Image from './../../../../../assets/InfluencerPageAssets/DummyGallery.png';
import classes from './../../Influencer.module.css';
function PostGallery(){

    const images = [
        { id: 1, url: Image, alt: 'Image 1' },
        { id: 2, url: Image, alt: 'Image 2' },
        { id: 3, url: Image, alt: 'Image 3' },
        { id: 4, url: Image, alt: 'Image 4' },
        { id: 5, url: Image, alt: 'Image 5' },
        { id: 6, url: Image, alt: 'Image 6' },
        { id: 7, url: Image, alt: 'Image 7' },
        { id: 8, url: Image, alt: 'Image 8' },
        { id: 9, url: Image, alt: 'Image 9' },
        { id: 10, url:Image, alt: 'Image 10' },
        { id: 11, url:Image, alt: 'Image 11' },
        { id: 16, url:Image, alt: 'Image 12' },
        { id: 12, url: Image, alt: 'Image 1' },
        { id: 13, url: Image, alt: 'Image 2' },
        { id: 14, url: Image, alt: 'Image 3' },
        { id: 15, url: Image, alt: 'Image 4' },
      ];
    
    return (
        <section className={classes.postGallery}>
        {images.map(arr=> <div key={arr.id} className={classes.imgWrapper}>
        <a href=""><img  src={arr.url} alt={arr.alt} /></a>
        </div> )}
        </section>
    )}

export default PostGallery;