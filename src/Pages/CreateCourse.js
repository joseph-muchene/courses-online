import * as React from "react";
import { v4 } from "uuid";
import Navbar from "../Component/Navbar";
import FileBase64 from "react-file-base64";
import { db, storage } from "../config/firebase";
import { toast, ToastContainer } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import "react-toastify/dist/ReactToastify.css";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
function CreateCourse() {
  const [videoUrl, setVideoUrl] = React.useState("");
  // state to store the uploaded file
  const [file, setFile] = React.useState("");
  // progress
  const [percent, setPercent] = React.useState();
  const [formData, setFormData] = React.useState({
    title: "",
    length: "",
    rating: "",
    description: "",
    thumbnail: "",
  });

  const { title, length, description, thumbnail } = formData;
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // onSubmit
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    let randomId = v4();
    try {
      setDoc(doc(db, "courses", randomId), {
        courseId: randomId,
        InstructorId: user.uid,
        title: title,
        description: description,
        length: length,
        thumbnail: thumbnail,
        videoUrl: videoUrl,
      })
        .then(() => toast.success("Added succesfully!"))
        .catch((err) => toast.error(err.message));
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(videoUrl);
  // handle upload file event

  const handleChangeEvent = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      toast.error("please upload an image first");
    }
    const storageRef = ref(storage, `/files/${file.name}` + v4());

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress

        setPercent(percent);
        if (percent === 100) {
          toast.success("video uploaded successfully");
        }
      },
      (err) => toast.error(err.message),
      () => {
        // get download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setVideoUrl(url);
        });
      }
    );
  };
  return (
    <div>
      <Navbar />
      <ToastContainer />
      <h1 className="text-center my-3">Create a Course</h1>
      <div className="container">
        <div className="mt-3">
          <input
            type="file"
            name="video"
            className="form-control"
            onChange={handleChangeEvent}
          />
        </div>
        <div className="mt-3">
          <button className="btn btn-secondary" onClick={handleUpload}>
            Upload Video
          </button>

          <p>{percent}</p>
        </div>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mt-3">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={title}
              onChange={handleChange}
            />
          </div>

          <div className="mt-3">
            <label htmlFor="length">Length</label>
            <input
              type="text"
              name="length"
              value={length}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mt-3">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              value={description}
              onChange={handleChange}
              name="description"
              className="form-control"
            />
          </div>
          <div className="mt-3">
            <label htmlFor="thumbnail">thumbnail</label>
            <div>
              <FileBase64
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setFormData({ ...formData, thumbnail: base64 })
                }
              />
            </div>
          </div>
          <div className="mt-3 mb-4">
            <input
              type="submit"
              name="submit"
              className="btn btn-primary"
              value="create course"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCourse;
