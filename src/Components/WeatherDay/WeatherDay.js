function WeatherDay({ min, max, description, icon, day }) {
  return (
    <>
      <div className="card-header">{day}</div>
      <div className="card-body text-center">
        <img
          src={`https://developer.accuweather.com/sites/default/files/${icon}-s.png`}
          alt={description}
        />
        <p>{description}</p>
        <p>
          Temp: {min}° / {max}°
        </p>
      </div>
    </>
  );
}

export default WeatherDay;
