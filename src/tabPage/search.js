import * as motavafa from '../parts/motavafa/motavafa.js'

function findNaam(naam){
    motavafa.findNaam(naam);//نام
}
function findNaamPedar(naamPedar){
    motavafa.findNaamPedar();//نام پدر
}
function findTarikhVafat(date1,date2) {
    motavafa.findTarikhVafat();// تاریخ فوت تا تاریخ فوت    
}

export {
    findNaam,
    findNaamPedar,
    findTarikhVafat
}