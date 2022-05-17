import { useState } from "react";

const LocationSearch = ({ onCityFound }) => {
  const [zipCode, setZipCode] = useState("");
  const apiKey = process.env.REACT_APP_API_KEY;
  function isValidUSZip(zip) {
    return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
  }
  const getLocation = (zip) => {
    console.log(isValidUSZip(zip));
    if (isValidUSZip(zip)) {
      const url = `http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${apiKey}&q=${zip}`;
      fetch(url)
        .then((res) => res.json())
        .then((res) => res.find((l) => l.Country.ID === "US"))

        .then((res) =>
          onCityFound({
            name: res.LocalizedName,
            state: res.AdministrativeArea.ID,
            key: res.Key,
          })
        )
        .catch(function () {
          document.getElementById("error").classList.add("d-block");
          document.getElementById("entry").classList.remove("d-none");
        });

      setZipCode("");
      document.getElementById("entry").classList.add("d-none");
      document.getElementById("error").classList.remove("d-block");
    } else {
      document.getElementById("error").classList.add("d-block");
    }
  };

  return (
    <div className="input-group  has-validation">
      <div className="invalid-feedback" id="error">
        Please enter a valid US zip code!
      </div>
      <input
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        placeholder="Zip code"
        className="form-control"
      />
      <div className="input-group-append">
        <button className="btn" onClick={() => getLocation(zipCode)}>
          Search
        </button>
      </div>
    </div>
  );
};

export default LocationSearch;
