export const geocode = async (address: string): Promise<{latitude: number; longitude: number;}> => {
    const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
    const geoData = await geoRes.json();
    console.log(geoData);
    const latitude = parseFloat(geoData[0].lat);
    const longitude = parseFloat(geoData[0].lon);
    return {latitude, longitude};
}