import React from "react";


export class Header extends React.Component {
    constructor(props){
        super(props)
    }
    render (){
        return(
            <div className="header" id="header">
                <img src="https://n11scdn.akamaized.net/a1/org/15/11/30/54/12/08/66/82/53/32/07/07/87650256438692757713.png" />
                 <div className="clearfix"></div>
                    <hr/>
            </div>
         )
    }   
    
};