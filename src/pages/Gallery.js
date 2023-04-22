import { useState } from 'react';
import {Button} from 'react-bootstrap';

const images = [
  {
    id: 1,
    category: "mountain",
    src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80",
    alt: "Poon Hill, Ghode Pani, Nepal"
  },
  {
    id: 2,
    category: "beaches",
    src: "https://images.unsplash.com/flagged/photo-1557899775-24a0957d3895?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80",
    alt: "Waterfall"
  },
  {
    id: 3,
    category: "mountain",
    src: "https://images.unsplash.com/photo-1549880181-56a44cf4a9a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    alt: ""
  },
  {
    id: 4,
    category: "birds",
    src: "https://images.unsplash.com/photo-1480044965905-02098d419e96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    alt: ""
  },
  {
    id: 5,
    category: "mountain",
    src: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    alt: "Sierra Nevada, United States"
  },
  {
    id: 6,
    category: "beaches",
    src: "https://images.unsplash.com/photo-1484821582734-6c6c9f99a672?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1033&q=80",
    alt: "Kudahuvadhoo, Central Province, Maldives"
  },
  {
    id: 7,
    category: "beaches",
    src: "https://images.unsplash.com/photo-1600273970168-c3db62dcf905?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    alt: "Roatán, Honduras"
  },
  {
    id: 8,
    category: "birds",
    src: "https://images.unsplash.com/photo-1470114716159-e389f8712fda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    alt: ""
  },
  {
    id: 9,
    category: "birds",
    src: "https://images.unsplash.com/photo-1549608276-5786777e6587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    alt: ""
  },
  {
    id: 10,
    category: "mountain",
    src: "https://cdn.pixabay.com/photo/2014/10/07/13/48/mountain-477832_960_720.jpg",
    alt: ""
  },
  {
    id: 11,
    category: "beaches",
    src: "https://cdn.pixabay.com/photo/2017/10/10/07/48/beach-2836300_960_720.jpg",
    alt: ""
  },
  {
    id: 12,
    category: "beaches",
    src: "https://cdn.pixabay.com/photo/2017/03/31/15/34/sunset-2191645_960_720.jpg",
    alt: ""
  },
  {
    id: 13,
    category: "birds",
    src: "https://cdn.pixabay.com/photo/2016/11/18/12/14/owl-1834152_960_720.jpg",
    alt: ""
  },
  {
    id: 14,
    category: "birds",
    src: "https://cdn.pixabay.com/photo/2014/05/11/13/39/bird-341898_960_720.jpg",
    alt: ""
  },
  {
    id: 15,
    category: "mountain",
    src: "https://cdn.pixabay.com/photo/2015/02/18/11/50/mountain-range-640617_960_720.jpg",
    alt: ""
  },
];

function ImageGallery({images}) {
  const [category, setCategory] = useState("all");

  const filterImages = category === "all" ? images : images.filter(image => image.category === category);

 return(
  <>
    <ButtonCategory 
    images={images}
    onCategoryChange={setCategory}/>
    <ImageContainer filterImages={filterImages}/>
  </>
 );
}

function ButtonCategory({onCategoryChange}){
  let categoryList = Array.from(new Set(images.map(x => x.category)));

  return(
    <div className='mb-2 justify-content-center text-center'>
      <Button className='me-1' onClick={() => onCategoryChange("all")}>All</Button>
      {categoryList.map(cat => (
        <Button key={cat} className='me-1' onClick={() => onCategoryChange(`${cat}`)}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</Button>
      ))}
    </div>
  );
}

function ImageContainer({filterImages}) {  
  return(
      <div className='row g-3 justify-content-center'>
        {filterImages.map(image => (
          <div key={image.id} className='col-4'>
            <div className='ratio ratio-16x9'
            style={{ 
              backgroundImage: `url(${image.src})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}>
            </div>
          </div>
        ))}
      </div>
  );
}


export default function App() {
  return (
    <div className='px-5'>
      <h1 className='text-center'>Image Gallery</h1>
      <ImageGallery images={images}/>     
      <h6 className='text-center mt-4'>
        Made by Fadilah Muh
      </h6> 
    </div>
  );
}
