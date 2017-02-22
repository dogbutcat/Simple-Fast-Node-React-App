interface GeoJSON{
    type: string,
    coordinates: any[]
}

export function ExchangeGeo(geo: GeoJSON) {
    if (geo.type == 'Point') {
        return geo.coordinates.reduce((pre, cur) => {
            pre.unshift(cur);
            // console.log(pre);
            return pre;
        }, []);
    }
}