declare module "leaflet-arc" {
    const arc: (coords: [number, number][], options?: { offset?: number }) => {
      geometries: { coords: [number, number][] }[];
    };
  
    export default arc;
  }
  