import React from 'react';


class DivisionMapNumber extends React.Component{
    render(){
        var divisions = [
            { name: 'mymensingh', x: 700, y: 564 },
            { name: 'dhaka', x: 675, y: 1028 },
            { name: 'sylhet', x: 1150, y: 652 },
            { name: 'chattagram', x: 1100, y: 1322 },
            { name: 'barisal', x: 705, y: 1473 },
            { name: 'khulna', x: 378, y: 1366 },
            { name: 'rangpur', x: 310, y: 307 },
            { name: 'rajshahi', x: 320, y: 680 }
        ];

        const {divCases} = this.props
        
            
        return(
            <g id="number-case">
                <defs>
                    <filter x="-0.15" y="0" width="1.3" height="1" id="caseSolid">
                        <feFlood flood-color="#FFFFFF"/>
                        <feComposite in="SourceGraphic" operator="add" />
                    </filter>
                </defs>
                {
                    divisions.map((item,index)=>{
                        return(
                            <text
                                id={item.name}
                                x={item.x}
                                y={item.y}
                                fill="#FF0000"
                                filter="url('#caseSolid')" 
                                font-weight="bold"
                                font-size="48">
                            {divCases[item.name].infected}
                            </text>
                        )
                    })
                }
            </g>
        )
    }
}

export default DivisionMapNumber