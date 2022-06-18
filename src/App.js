import "./styles.css";
import React from "react";
import PetProfile from "./components/PetProfile";

export default function App() {
  return (
    <div className="flex flex-col bg-red">
      <h1>Show your pet</h1>
      <PetProfile />
      {/* Создать мое животное, появлется модальное окно */}
    </div>
  );
}
