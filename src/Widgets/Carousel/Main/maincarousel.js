import React from "react";
import Slider from "react-slick";


class Mycarousel extends React.Component {

  state = {
    slider_data: []
  }

  componentDidMount() {
    let slider_data = this.props.data
    this.setState({ 
      slider_data
     })
    console.log({slider_data})
  }


  sliderDataFunc () {
    var mystyles = {
      height: this.props.height+'rem',
      width: '100%'
    }
    let template = null
    if (this.state.slider_data.length < 1){
      template= (
        <>
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
        </>
      )
    }else {
      console.log(this.state.slider_data);
      template =(
        this.state.slider_data.map((item, i) => (
          <div key={i}>
            {/* <img src={${URL}`/api/uploads/blog_images/`${item.featured_image}} style={{...mystyles}}  alt={item.title}/> */}
          </div>
        ))
      )
    }

  }

  render() {
    var settings = {
      // dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    
    return (
      <Slider {...settings}>
        {this.sliderDataFunc()}
      </Slider>
    );
  }
}


export default Mycarousel;