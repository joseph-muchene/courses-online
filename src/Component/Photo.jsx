import React, { useState } from 'react'
import { getStorage } from "firebase/storage";
import { toast, ToastContainer } from 'react-toastify'
import { storage } from '../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
function Photo() {
    // State to store uploaded file
    const [file, setFile] = useState("");
    const [url, setUrl] = useState("")
    // progress
    const [percent, setPercent] = useState(0);

    // Handle file upload event and update state
    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    const handleUpload = () => {
        if (!file) {
            alert("Please upload an image first!");
        }

        const storageRef = ref(storage, `/users/${file.name}${Math.random()}`);

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
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                    setUrl(url)
                    toast.success("photo uploaded")


                    const auth = getAuth();
                    updateProfile(auth.currentUser, {
                        photoURL: url
                    }).then(() => {
                        toast.success("user updated")
                    }).catch((error) => {
                        // An error occurred
                        // ...
                    });

                });
            }
        );
    };
    return (
        <div>
            <ToastContainer />
            <div className="card " style={{ width: "18rem" }}>
                <img src={url} className="rounded-full" />
            </div>
            <div className="container">

                <input type="file" onChange={handleChange} accept="/image/*" className='form-control mt-3' />
                <div className="mt-3 mb-4">
                    <button onClick={handleUpload} className="btn btn-primary">Upload </button>
                </div>


            </div>
        </div>
    )
}

export default Photo