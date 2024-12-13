import React, { useState, useMemo } from "react";
import Image from "next/image";
import { ChevronDown, X, Search, ChevronRight, Map } from "lucide-react";

const SaudiCitySelector = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const saudiCities = [
    "Riyadh",
    "Jeddah",
    "Mecca",
    "Medina",
    "Dammam",
    "Taif",
    "Tabuk",
    "Abha",
    "Al Khobar",
    "Buraidah",
    "Khamis Mushait",
    "Qatif",
  ];

  const filteredCities = useMemo(
    () =>
      saudiCities.filter((city) =>
        city.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [saudiCities, searchTerm]
  );

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="hidden sm:flex items-center mx-auto p-2 bg-gray-50 rounded-lg cursor-pointer"
      >
        <Image
          src="/images/saudi.svg"
          alt="Country logo"
          width={500}
          height={500}
          className="h-8 w-12 object-contain"
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-600">City</span>
            <ChevronDown className="w-4 text-gray-500" />
          </div>
          <div className="font-semibold text-base text-gray-800">Riyadh</div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center ">
          <div className="bg-white rounded-lg w-11/12 max-w-md max-h-[80vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Chose City</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="my-3">
              For better performance Choose Your current city
            </div>
            {/* Search Input */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-8 border rounded-lg  focus:border-maincolor border-line"
              />
              <Search className="absolute left-2 top-3 text-gray-400 w-4 h-4" />
            </div>

            {/* Cities in Column Layout */}
            <div className="flex flex-col ">
              {filteredCities.length > 0 ? (
                filteredCities.map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      // Logic to select city would go here
                      setIsModalOpen(false);
                    }}
                    className="flex justify-between p-3 bg-gray-100 hover:bg-secfill transition-colors text-left w-full border-b border-1/2 border-line"
                  >
                    <div className="flex gap-5 items-center">
                      <Map size={16} className="text-secondary" />
                      <span>{city}</span>
                    </div>
                    <ChevronRight className="text-line" />
                  </button>
                ))
              ) : (
                <p className="text-center text-gray-500">No cities found</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SaudiCitySelector;
