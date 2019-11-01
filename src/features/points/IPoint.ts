
export default interface IPoint{
  id?: number;
  hike_id: number;
  latitude: number;
  longitude: number;
  altitude: number|undefined|null;
  created_at?: number;
  updated_at?: number;
}
