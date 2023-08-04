const desajabar = require("../data/desajabar.json");
const data_desa = desajabar

const searchCenter = (village_name,subdistrict_name,district_name) => {
    const village_data = data_desa.filter(el => el.village === village_name && el.sub_district === subdistrict_name )
    const polygon = village_data[0].border
    const numPoints = polygon.length;

    let sumLatitude = 0.0
    let sumLongtitude = 0.0

    polygon.forEach((point) => {
        sumLatitude += point[1]
        sumLongtitude += point[0]
    })

    let averageLatitude = sumLatitude/numPoints;
    let averageLongtitude = sumLongtitude / numPoints;

    let centroid = {lintang:averageLatitude,bujur:averageLongtitude}
    return centroid
}



module.exports = searchCenter