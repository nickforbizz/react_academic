import React, { useState} from 'react';
import {   Affix  } from 'antd';

export default function SideRightPage(props) {

    const [top] = useState(100);

    

    return (
        <React.Fragment>

                
                    <div className="pad_top" id="top_sticker_left">
                        <Affix offsetTop={top}>
                            <ul className="collapsible">
                            <li className="active">
                                <div className="collapsible-header"><i className="material-icons">filter_drama</i>First</div>
                                <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                            </li>
                            <li className="active">
                                <div className="collapsible-header "><i className="material-icons">place</i>Second</div>
                                <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                            </li>
                            <li>
                                <div className="collapsible-header "><i className="material-icons">whatshot</i>Third</div>
                                <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                            </li>
                            </ul>
                        </Affix>
                    </div>
              
            
        </React.Fragment>
    )
}
