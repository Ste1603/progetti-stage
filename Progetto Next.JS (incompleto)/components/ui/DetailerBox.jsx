import React from "react";

const DetailerBox = ({ name, description, services }) => {
  return (
    /* From Uiverse.io by seyed-mohsen-mousavi */
    <div className="mb-10 w-full overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105">
      <div className="bg-green-200 p-1"></div>
      <div className="p-4">
        <h2 className="mb-4 text-3xl font-bold text-gray-800">{name}</h2>
        <p className="mb-6 overflow-hidden text-gray-600">{description}</p>
        <div className="flex w-full justify-center gap-2">
          {services.map((service) => (
            <div className="w-1/3 rounded-2xl border p-2 h-auto">
              <p className="text-center text-2xl font-bold text-gray-800 first-letter:uppercase">
                {service.type}
                <br />
                {service.price}€
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4">
        <button className="focus:shadow-outline-green w-full rounded-full bg-green-500 px-4 py-2 text-white hover:bg-green-700 focus:outline-none active:bg-green-800">
          Prenota
        </button>
      </div>
    </div>
  );
};

export default DetailerBox;
