import React from 'react'
import { documentSvg, pdfSvg, videoSvg } from '../assets/images'

const GetFileIcon = ({type}) => {
  console.log(type);
  return (<>
    {
      String(type).includes('pdf')?
      <img src={pdfSvg} alt="pdf" srcset="" />
      :<></>
    }
    {
      String(type).includes('document')?
      <img src={documentSvg} alt="video" srcset="" />
      :<></>
    }
    {
      String(type).includes('video')?
      <img src={videoSvg} alt="video" srcset="" />
      :<></>
    }
  </>)
}

export default GetFileIcon