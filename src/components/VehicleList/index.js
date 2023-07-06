import React, { useRef, useState } from 'react';

import useData from './useData';

import './style.scss';

export default function VehicleList() {
  const [loading, error, vehicles] = useData();
  const [modalData, setModalData] = useState();

  const dialogEl = useRef(null);

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
      <dialog ref={dialogEl} className="VehicleDialog" data-testid="dialog">
        {modalData && (
          <form method="dialog" className="VehicleDialog__form" data-testid="dialog-form">
            <p className="VehicleDialog__formLabel">Number of passengers</p>
            <p className="VehicleDialog__formValue">{modalData.meta.passengers}</p>
            <p className="VehicleDialog__formLabel">Drivetrain options</p>
            <p className="VehicleDialog__formValue">
              {modalData.meta.drivetrain.map(
                // eslint-disable-next-line react/no-array-index-key
                (item, index) => <span key={index} className="VehicleDialog__formValue__item">{item}</span>
              )}
            </p>
            <p className="VehicleDialog__formLabel">Emissions information</p>
            <p className="VehicleDialog__formValue">{modalData.meta.emissions.template.replace(/\Svalue/, modalData.meta.emissions.value)}</p>
            <button type="submit" className="VehicleDialog__button">OK</button>
          </form>
        )}
      </dialog>
      <ul className="VehicleList" data-testid="results">
        {vehicles.map((vehicle, index) => (
          <li key={vehicle.id}>
            <button
              type="button"
              className="VehicleList__vehicleButton"
              data-testid={`vehicleButton_${vehicle.id}`}
              style={{ '--i': index }}
              onClick={() => {
                setModalData(vehicle);
                if (dialogEl.current) {
                  dialogEl.current.showModal();
                }
              }}
            >
              <VehicleCard vehicle={vehicle} />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

function VehicleCard({ vehicle }) {
  return (
    <div className="VehicleCard" key={vehicle.id}>
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
    </div>
  );
}
