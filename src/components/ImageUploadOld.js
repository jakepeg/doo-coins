import React, {useState} from 'react'

function ImageUpload(props) {
  // const childID = 'ashasdkjahsd'
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'doozone')
    // data.append('allowed_formats', 'jpg')
    // data.append('format', 'jpg')
    data.append("public_id", props.selectedChild)
    setLoading(true)
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/jakepeg/image/upload',
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json()

    setImage(file.secure_url)
    setLoading(false)
  }

  return (
    <div>
    <label htmlFor="file">
    Change picture 
      <input 
        type="file"
        name="file"
        placeholder="Upload an image"
        onChange={uploadImage}
      /><br />
      </label>
      {loading ? (
        <h3>LOADING IMAGE...</h3>
      ) : (
        <img src={image} style={{width: '300px'}} />
      )}


    </div>
  )
}

export default ImageUpload