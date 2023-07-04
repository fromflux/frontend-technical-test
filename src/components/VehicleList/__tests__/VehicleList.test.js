import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import VehicleList from '..';
import useData from '../useData';

jest.mock('../useData');

const MOCK_VEHICLE = {
  id: 'xe',
  modelYear: 'k17',
  apiUrl: '/api/vehicle_xe.json',
  media: [
    {
      name: 'vehicle',
      url: '/images/16x9/xe_k17.jpg'
    },
    {
      name: 'vehicle',
      url: '/images/1x1/xe_k17.jpg'
    }
  ],
  description: 'The most advanced, efficient and refined sports saloon that Jaguar has ever produced',
  price: '£30,000',
  meta: {
    passengers: 5,
    drivetrain: [
      'AWD',
      'RWD'
    ],
    bodystyles: [
      'saloon'
    ],
    emissions: {
      template: 'CO2 Emissions $value g/km',
      value: 99
    }
  }
};

describe('<VehicleList /> Tests', () => {
  it('Should show loading state if it not falsy', () => {
    useData.mockReturnValue([true, 'An error occurred', 'results']);
    const { queryByTestId } = render(<VehicleList />);

    expect(queryByTestId('loading')).not.toBeNull();
    expect(queryByTestId('error')).toBeNull();
    expect(queryByTestId('results')).toBeNull();
  });

  it('Should show error if it is not falsy and loading is finished', () => {
    useData.mockReturnValue([false, 'An error occurred', 'results']);
    const { queryByTestId } = render(<VehicleList />);

    expect(queryByTestId('loading')).toBeNull();
    expect(queryByTestId('error')).not.toBeNull();
    expect(queryByTestId('results')).toBeNull();
  });

  it('Should show results if loading successfully finished', () => {
    useData.mockReturnValue([false, false, []]);
    const { queryByTestId } = render(<VehicleList />);

    expect(queryByTestId('loading')).toBeNull();
    expect(queryByTestId('error')).toBeNull();
    expect(queryByTestId('results')).not.toBeNull();
  });

  it('Should show vehicle card if loading successfully finished', () => {
    useData.mockReturnValue([false, false, [MOCK_VEHICLE]]);
    const { queryByTestId, queryByText } = render(<VehicleList />);

    expect(queryByTestId('loading')).toBeNull();
    expect(queryByTestId('error')).toBeNull();
    expect(queryByText(MOCK_VEHICLE.description)).not.toBeNull();
  });

  it('Should show vehicle dialog when vehicle item clicked', async () => {
    HTMLDialogElement.prototype.showModal = jest.fn();

    useData.mockReturnValue([false, false, [MOCK_VEHICLE]]);
    render(<VehicleList />);

    const vehicleButton = screen.getByTestId(`vehicleButton_${MOCK_VEHICLE.id}`);
    expect(vehicleButton).not.toBeNull();

    fireEvent.click(vehicleButton);

    await expect(screen.getByTestId('dialog-form')).not.toBeNull();
    await expect(screen.getByText('Emissions information')).not.toBeNull();
    await expect(screen.getByText(`CO2 Emissions ${MOCK_VEHICLE.meta.emissions.value} g/km`)).not.toBeNull();
  });
});
