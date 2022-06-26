import React, { useState, useEffect } from "react";
import PetProfile from "./components/PetProfile";
import Modal from "./components/Modal";
import { blobToDataURL } from "blob-util";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const [pets, setPets] = useState([]);

  const fetchPets = () => {
    fetch(
      `https://pets-project-b1eb9-default-rtdb.europe-west1.firebasedatabase.app/pets.json`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const newPets = Object.entries(data).map(([key, value]) => {
          return { ...value, id: key };
        });
        console.log(newPets);
        setPets(newPets);
      });
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div className="flex flex-col container mx-auto px-4">
    <img src={"../public/img/cat-icon.svg"} />
      <h1 className="text-4xl font-bold mb-[20px]">
      Show your pet!
      </h1>
      <h2>We all want to know about your pet</h2>
      <div className="flex flex-wrap gap-6 justify-center">
        {pets.map((pet) => (
          <PetProfile pet={pet} fetchPets={fetchPets} />
        ))}
      </div>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <button className="btn modal-button bg-white text-black" onClick={() => setModalOpen(true)}>
        Add your pet
      </button>
    </div>
  );
}
