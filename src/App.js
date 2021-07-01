import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'; 
import Col from 'react-bootstrap/Col'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import CardShow from './CardShow.js';

//  creating context for all data received
export const dataReceived = React.createContext();

const alphanumeric_space=/^[0-9a-zA-Z@#*\s]+$/;

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = { result: '',
                     value: '',
                     data: '',
                     imagesAreDisplayedPerBlock: 9,
                     inputError: false,
                     outputErrorMessage: null
                   };
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleOnKeyUp = this.handleOnKeyUp.bind(this)
  }

  static checkForErrors = value => 
    [...value].filter(item =>
      !item.match(alphanumeric_space))
 
// getting data from https://gnews.io/ 
  async handleSubmit(e) {
      e.preventDefault();
      
      if(App.checkForErrors(this.state.value).length===0)
      {
        this.setState({inputError : false});

        
        let data=await fetch(`https://gnews.io/api/v4/search?q=${this.state.value}&token=67a8e3a3f72accabacf4f12acffc1e37`)
        .then(result => result.json())
        

        if(data.articles!==undefined && data.articles.length>0){
          if(data.articles.length>this.state.imagesAreDisplayedPerBlock){
            this.setState({result: data.articles.slice(0,this.state.imagesAreDisplayedPerBlock)});
          } else {
            this.setState({result: data.articles});
          }
        } else {
          this.setState({outputErrorMessage: "Bad request or no results found. Please check the input!"})
        }
        // console.log("DUOM1: ", this.state.result)
      } 
  }
  // On input change
  handleChange(e) {
    // console.log("value: ", e.target.value," + ", this.state.value)
    if(App.checkForErrors(this.state.value).length===0){
      this.setState({inputError : false});
    }
    // if entered wrong symbol show error
    if(!e.target.value.match(alphanumeric_space))
    {
      this.setState({inputError : true});
    }
    this.setState({ value: e.target.value });
  }


  // on key pressed show or discard error
  handleOnKeyUp(e){
    this.setState({outputErrorMessage : null})
    if(App.checkForErrors(this.state.value).length===0){
      this.setState({inputError : false});
    }
  }
 
  render() {
  let error = this.state.inputError ? (
              <div className="d-flex justify-content-center m-3 text-danger">Only latin letters, numbers, "@", "#", "*" and space symbols are alowed. 
              Please check the input field below!</div>) :null;
  let resultError = this.state.outputErrorMessage ? ( <div className="d-flex justify-content-center m-3 text-danger">{this.state.outputErrorMessage}</div>)
              :null;
  
    return (
      <div id="search-bar">
        <Form onSubmit={this.handleSubmit}>
             <Form.Row className="d-flex justify-content-center m-3">
                <Col>
                {error || resultError}
                </Col>
             </Form.Row>
             <Form.Row className="d-flex justify-content-center m-3">
                <Col sm={12} lg={11}>
                  <Form.Group controlId="formBasicSearch">
                    <Form.Control onChange={this.handleChange} onKeyUp={this.handleOnKeyUp} type="text" placeholder="Enter your search"  maxLength="40"/>
                  </Form.Group>
                </Col>
                <Col  className="align-self-start" sm={12} lg={1}>
                  <Button className="w-100" variant="primary" type="submit">Search</Button>
                </Col>
             </Form.Row>
        </Form>
        {this.state.result ? (
          <dataReceived.Provider value={this.state.result}>
            <CardShow/>
          </dataReceived.Provider>) :null}
      </div>
    );
  }
}

export default App;
