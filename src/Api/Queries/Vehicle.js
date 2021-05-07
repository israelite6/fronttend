export const VEHICLE_QUERY = `
  query ($id: ID) {
    Vehicle (id: $id){
      bike_id
      lat
      lon
      is_reserved
      is_disabled
      vehicle_type
    }
  }
`;
