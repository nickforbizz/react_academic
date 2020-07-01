import React from 'react'


import Maincarousel from '../../Widgets/Carousel/Main/maincarousel';

export default function MainPage() {
    return (
        <React.Fragment>            
                

                {/* header tag on phone */}
                <div className="hide-on-med-and-up">
                    <h4>News</h4>
                    <div className='divider'></div>
                </div>

                {/* slider for news */}
                <Maincarousel height={25}/>

                <div className="col s12 m7">
                    {/* header on lg devices */}
                    <h4 className="">News</h4>

                {/* cards for news */}
                <div className="card horizontal">
                    <div className="card-image">
                        <img src="/images/Donate page 2.PNG" alt=""/>
                    </div>
                    <div className="card-stacked">
                        <div className="card-content">
                            <p>I am a very simple card. I am good at containing small bits of information.</p>
                        </div>
                        <div className="card-action right-align">
                            <a href="#!" className="waves-effect waves-light btn-small">View</a>
                        </div>
                    </div>
                </div>



                {/* tobe deleted */}
                <div className="card horizontal">
                    <div className="card-image">
                        <img src="/images/Donate page 2.PNG"  alt=""/>
                    </div>
                    <div className="card-stacked">
                        <div className="card-content">
                        <p>I am a very simple card. I am good at containing small bits of information.</p>
                        </div>
                        <div className="card-action right-align">
                        <a href="#!" className="waves-effect waves-light btn-small">View</a>
                        </div>
                    </div>
                    </div>
                </div>


            

            
        </React.Fragment>
    )
}
