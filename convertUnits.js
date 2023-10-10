import { tempUnit } from "./index.js"

function getTempUnit(){
    if(tempUnit==='Imperial'){
      return '°F'
    }
    else{
      return '°C'
    }
  }
  function SpeedInKm(speed){
      return ((speed*3600)/1000).toFixed(1)
  }
  function visibilityInKm(visibility){
        return ((visibility/1000).toFixed(0))
  }
  
    

export {getTempUnit,SpeedInKm,visibilityInKm}