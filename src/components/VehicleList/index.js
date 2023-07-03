import React from 'react';

import useData from './useData';

import './style.scss';

export default function VehicleList() {
  const [loading, error, vehicles] = useData();

  if (loading) {
    return <div data-testid="loading">Loading</div>;
  }

  if (error) {
    return <div data-testid="error">{ error }</div>;
  }

  return (
    <>
      {/* <pre>
        {JSON.stringify(vehicles, null, 2)}
      </pre> */}
      <ul className="VehicleList" data-testid="results">
        {vehicles.map((vehicle) => (
          <li className="VehicleCard" key={vehicle.id}>
            <picture className="VehicleCard__picture">
              <source media="(max-width: 767px)" srcSet={vehicle.media[1].url} />
              <source media="(min-width: 768px)" srcSet={vehicle.media[0].url} />
              <img className="VehicleCard__image" src={vehicle.media[1].url} alt={vehicle.description} />
            </picture>

            <div className="VehicleCard__copy">
              <div className="VehicleCard__titleWrap">
                <p className="VehicleCard__title">{vehicle.id}</p>
              </div>
              <p className="VehicleCard__price">
                From
                {' '}
                {vehicle.price}
              </p>
              <p className="VehicleCard__description">{vehicle.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
