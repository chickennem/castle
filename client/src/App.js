import React, { Component } from 'react';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';
import { Button } from 'reactstrap';
import HotelResto from './HotelRestoEtoile.json';


class App extends Component {
  constructor(props) {
    super(props);
    const{data} =this.props;
    this.state = {
      value:data,
      currentHotel: "",
      currentPrice: "",
      currentUrl : ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  //  this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
  }

  handleSubmit() {
    let price;
    let url;
    if (this.state.currentHotel) {
      console.log(this.state.currentHotel);

    }

    for(let i = 0; i < HotelResto.length;i++)
    {
     // console.log(HotelResto[i].nom)
      if (this.state.value[i].nom=== this.state.currentHotel)
      {
        console.log(HotelResto[i].nom + " " + HotelResto[i].prix)
        price = HotelResto[i].prix  ;
        url = HotelResto[i].url;


      }
    }
    this.setState({ currentPrice: price });

    this.setState({ currentUrl: url });
    return price;
  
  }


  handleChange(e) {
    this.setState({ currentHotel: e.target.value },
      
      );
      
  }

  onRadioBtnClick(rSelected) {
    this.setState({ rSelected });
  }

datepick(){
  customElements.whenDefined('vaadin-date-picker').then(_ => {
    const datePicker = document.querySelector('vaadin-date-picker');
    console.log(datePicker);
    datePicker.addEventListener("value_changed", e => console.log(e.input.value))
  })

}



  render() {  
    const { data } = this.props;
 /*

            customElements.whenDefined('vaadin-date-picker').then(function () {
          var start = document.querySelector('#start');
          var end = document.querySelector('#end');

          start.addEventListener('change', function () {
            end.min = start.value;

            // Open the second date picker when the user has selected a value
            if (start.value) {
              end.open();
            }
          });

          end.addEventListener('change', function () {
            start.max = end.value;
          });
        });
   const nameList = data.map(name => {
      return (
           <section style={sectionStyle}>
        </section>  
        <li>{name.nom}</li>
      )
    })
*/
    let ListHotel = data.map((name) =>
      <li value={name.nom} key={name.nom}>{name.nom} : {name.prix} </li>

    );
    let optionItems = data.map((name) =>
      <option value={name.nom} key={name.nom}>{name.nom} </option>

    );//   let choosenHotel = document.getElementById('select').options[1].value 
  
    let date = 
      customElements.whenDefined('vaadin-date-picker').then(function () {
              var start = document.querySelector('#start');
      var end = document.querySelector('#end');

              start.addEventListener('change', function () {
        end.min = start.value;

      // Open the second date picker when the user has selected a value
      if (start.value) {
        end.open();
      }
    });

              end.addEventListener('change', function () {
        start.max = end.value;
      });
    });

    let price = <h3 >Le prix sera de<span > {this.state.currentPrice}</span> € / nuit</h3>;
    let lien = <a href={this.state.currentUrl} target="_blank"> <button class="price" >Book your night</button></a>
    
  /*  let optionPrice = data.map((name) =>
      <li> Ca fera {name.prix} € </li >

    );
  
  //   let first =  document.getElementById('select').options[0].value ;
     
    //  <Button id="compute" color="primary" onClick={() => this.onRadioBtnClick(optionPrice)} active={this.state.rSelected === optionPrice}>Valider</Button>
<select id="liste" className="form" name="select" onChange={this.handleChange} >
            <option value="">--Please choose an hotel--</option>
          {optionItems}
        </select>
        <Button id="compute" onClick={this.handleSubmit}>
            Valider
        </Button>
*/
    return (

      <div> 
        <div >

             <select id="liste" className="form" name="select" onChange={this.handleChange} >
            <option value="">--Please choose an hotel--</option>
          {optionItems}
          </select>
        
        </div>
        <div>
        <vaadin-date-picker id="start" label="Start"></vaadin-date-picker>
        <vaadin-date-picker id="end" label="End"></vaadin-date-picker>
        </div>
        <Button id="compute" color="primary" onClick={this.handleSubmit} active={this.state.rSelected === this.handleSubmit  }>Get Your Price </Button>
        <div >
          {price}
          {lien}
        </div>

      </div>
    




    )


   // return null
  }
}

export default App;
