import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import { regions } from '../utils/dummyData';

const getRegionCenter = (regionId) => {
    const centers = {
        'indian-ocean': [-10, 70],
        'bay-of-bengal': [15, 89],
        'arabian-sea': [15, 64]
    };
    return centers[regionId];
};

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-white">
            <h1 className="absolute top-8 left-1/2 -translate-x-1/2 text-2xl md:text-4xl z-[1000] text-center font-bold text-gray-800">
                Explore India’s Ocean Data
            </h1>

            <MapContainer
                center={[20.5937, 78.9629]}
                zoom={5} 
                minZoom={4}
                maxZoom={6}
                className="h-full w-full z-10"
                zoomControl={false}
                attributionControl={false}
                scrollWheelZoom={true}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                
                {regions.map((region) => (
                    <Marker
                        key={`label-${region.id}`}
                        position={getRegionCenter(region.id)}
                        icon={L.divIcon({
                            className: 'custom-label-icon',
                            html: `<div style="color:black; font-weight:bold; font-size:16px;">${region.name}</div>`,
                            iconSize: [200, 20]
                        })}
                    />
                ))}
            </MapContainer>

            <div className="absolute top-1/2 right-8 -translate-y-1/2 z-[1000]">
                <button
                    className="bg-gray-800 text-white rounded-2xl px-6 py-4 font-bold text-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    onClick={() => navigate('/chatbot')}
                >
                    Explore Data
                </button>
            </div>
        </div>
    );
};

export default LandingPage;
