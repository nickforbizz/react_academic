import React from "react";
import Slider from "react-slick";


class Mycarousel extends React.Component {
  render() {
    var settings = {
      // dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    var mystyles = {
      height: this.props.height+'rem',
      width: '100%'
    }
    return (
      <Slider {...settings}>
        <div>
          <img src='/images/Home Page 1.PNG' style={{...mystyles}}  alt=""/>
        </div>
        <div>
          <img src='/images/Donate page 2.PNG' style={{...mystyles}}  alt=""/>
        </div>
        <div>
          <img src='/images/Donate page 1.PNG' style={{...mystyles}}  alt=""/>
        </div>
        <div>
          <img src='/images/Homepage 3.PNG' style={{...mystyles}}  alt=""/>
        </div>
        
      </Slider>
    );
  }
}


export default Mycarousel;