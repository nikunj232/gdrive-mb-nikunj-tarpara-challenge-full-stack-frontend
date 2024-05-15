import React from 'react'
import { documentSvg, pdfSvg } from '../assets/images'

const GetFileIcon = ({type}) => {
  console.log(type);
  return (<>
    {
      String(type).includes('pdf')?
      <img src={pdfSvg} alt="" srcset="" />
      :<></>
    }
    {
      String(type).includes('document') || String(type).includes('mp4')?
      <img src={documentSvg} alt="" srcset="" />
      :<></>
    }
  </>)
}

export default GetFileIcon