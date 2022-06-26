import React from "react";

export default function PetProfile(props) {
  const pet = props.pet;

  function addLike() {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: (pet.likes || 0) + 1 })
    };

    fetch(
      `https://pets-project-b1eb9-default-rtdb.europe-west1.firebasedatabase.app/pets/${pet.id}.json`,
      requestOptions
    )
      .then((res) => {
        return res;
      })
      .then((data) => {
        console.log(data);
        props.fetchPets();
      });
  }

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <div className="avatar">
          <div className="w-25">
            <img src={pet.imageURL} />
          </div>
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{pet.name}</h2>
        {/* Pet type */}
        <h3 className="text-blue-600">{pet.type}</h3>
        <p>{pet.description}</p>
        <div className="card-actions justify-end">
          <button className="btn gap-2" onClick={addLike}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#ff4081"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            Like {pet.likes || 0}
          </button>
        </div>
      </div>
    </div>
  );
}
