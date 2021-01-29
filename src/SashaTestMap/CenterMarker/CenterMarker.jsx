import React from 'react';
import {Marker} from 'react-map-gl';
import { ReactSVG } from 'react-svg'

const CenterMarker = (props) => {
    const {viewport, showCreteEvent} = props;
    return (  
        showCreteEvent &&
        <Marker
            latitude={viewport.latitude} 
            longitude={viewport.longitude} 
            offsetLeft={-8} 
            offsetTop={-12} 
            >
            <ReactSVG 
                src="/icons/location.svg"
                beforeInjection={(svg) => {
                svg.setAttribute('style', 'height: 35px')}} 
            />
            {/* Icons made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */}
        </Marker>
    )

}
 
export default CenterMarker;