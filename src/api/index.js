// eslint-disable-next-line no-unused-vars
import { request } from './helpers';

/**
 * Pull vehicles information
 *
 * @return {Promise<Array.<vehicleSummaryPayload>>}
 */
// TODO: All API related logic should be made inside this function.
export default async function getData() {
  try {
    const vehicles = await request('/api/vehicles.json');

    const detailsPromises = await Promise.allSettled(vehicles.map((vehicle) => request(vehicle.apiUrl)));

    const vehiclesWithPrice = [];

    detailsPromises.forEach(async (promise, index) => {
      if (promise.status !== 'rejected') {
        const detail = await promise.value;
        if (detail.price) {
          const current = vehicles[index];
          vehiclesWithPrice.push({
            ...current,
            ...detail
          });
        }
      }
    });

    return vehiclesWithPrice;
  } catch (ex) {
    throw new Error(ex.message);
  }
}
