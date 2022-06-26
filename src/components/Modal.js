import React, { useState } from "react";
import AWS from "aws-sdk";
import { arrayBufferToBlob } from "blob-util";

export default function Modal(props) {
  const [pet, setPet] = useState({});
  const [errors, setErrors] = useState([]);

  let r = (Math.random() + 1).toString(36).substring(7);

  const updatePetField = (value, fieldName) => {
    setPet({
      ...pet,
      [fieldName]: value
    });
  };

  const createPet = () => {
    const petErrors = [];

    if (!pet.name) {
      petErrors.push("name");
    }
    if (pet.name?.length < 4) {
      petErrors.push("name-length");
    }

    if (!pet.description) {
      petErrors.push("description");
    }

    if (petErrors.length > 0) {
      setErrors(petErrors);
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pet)
    };

    fetch(
      "https://pets-project-b1eb9-default-rtdb.europe-west1.firebasedatabase.app/pets.json",
      requestOptions
    )
      .then((res) => {
        if (res.status !== 200) {
          setErrors("shit!");
        }
        return res;
      })
      .then((data) => {
        console.log(data);
        props.setModalOpen(false);
        window.location.reload();
      });
  };

  async function uploadFile(e) {
    const s3 = new AWS.S3({
      accessKeyId: "AKIAVJ6CNVBNUPLPFDPW",
      secretAccessKey: "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",
      region: "eu-central-1"
    });
    var file = e.target.files[0];
    var fileReader = new FileReader();
    fileReader.onloadend = async function (e) {
      var arrayBuffer = e.target.result;
      var fileType = "image/jpeg";
      var blob = arrayBufferToBlob(arrayBuffer, fileType);

      const uploadedImage = await s3
        .upload({
          Bucket: "productmate-file-storage",
          Key: `${r}.jpeg`,
          Body: blob
        })
        .promise();
      console.log(uploadedImage);
      updatePetField(uploadedImage.Location, "imageURL");
    };
    fileReader.readAsArrayBuffer(file);
  }

  return (
    <div>
      <div className={`modal ${props.modalOpen ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Enter information about your pet
          </h3>
          <div clasName="py-4">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">What is your pet name?</span>
              </label>

              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={(event) => updatePetField(event.target.value, "name")}
              />
            </div>
          </div>
          {errors.find((error) => error === "name") && (
            <div className="error-message">Error! Name is required.</div>
          )}
          {errors.find((error) => error === "name-length") && (
            <div className="error-message">
              Error! Name should be at least 4 letters
            </div>
          )}
          <div className="form-control w-full max-w-xs mt-10">
            <label className="label">
              <span className="label-text">
                What kind of animal do you have?
              </span>
            </label>
            <select
              className="select select-bordered"
              onChange={(event) => updatePetField(event.target.value, "type")}
            >
              <option disabled value>
                cat
              </option>
              <option>dog</option>
              <option>fish</option>
              <option>bird</option>
              <option>reptile</option>
              <option>other</option>
            </select>
          </div>
          <br />
          {/* Upload pet's pic */}
          <form className="flex items-center">
            <div className="shrink-0"></div>
            <label className="block">
              <span className="sr-only">Upload your pet's photo</span>
              <input
                onChange={uploadFile}
                type="file"
                class="block w-full text-sm text-slate-500
file:mr-4 file:py-2 file:px-4
file:rounded-full file:border-0
file:text-sm file:font-semibold
file:bg-violet-50 file:text-violet-700
hover:file:bg-violet-100
"
              />
            </label>
          </form>
          <br />
          {/* Your pet's decription */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">What's your pet's description?</span>
            </label>
            <input
              onChange={(event) =>
                updatePetField(event.target.value, "description")
              }
              type="text"
              placeholder="Type here"
              className="input input-bordered input-lg w-full max-w-xs"
            />
          </div>
          {errors.find((error) => error === "description") && (
            <div>Error! Description is required.</div>
          )}

          {errors.find((error) => error === "shit!") && (
            <div className="error-message">Error! Shit!.</div>
          )}
          <div className="modal-action">
            <button className="btn" onClick={createPet}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
