import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBBtn
} from "mdbreact";
import {MDBCardImage, MDBCardTitle, MDBCardText,MDBIcon} from 'mdbreact';
import './App.css';
import Swal from 'sweetalert2'
                 
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '' ,text: '' ,imageurl: '',memeData:[]};
  }
  componentDidMount() {    
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};
fetch("https://xmeme-aditi.herokuapp.com/", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)
    this.setState({memeData:result.data})
  })
  .catch(error => console.log('error', error));
   }
   myChangeHandler1 = (event) => {
   this.setState({username: event.target.value});
   }
   myChangeHandler2 = (event) => {
    this.setState({text: event.target.value});
    }
    myChangeHandler3 = (event) => {
      this.setState({imageurl: event.target.value});
      }
    saveResponse=()=>{
      var imageurl=this.state.imageurl;
      var text=this.state.text;
      var username=this.state.username;
      if(username&&text&&imageurl){
      var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("name", username);
urlencoded.append("text", text);
urlencoded.append("url", imageurl);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://xmeme-aditi.herokuapp.com/", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)
    if(result.status){
      Swal.fire({
          title: "Saved",
          width: 350,
          padding: '3em'
        })
      var memeData2=this.state.memeData
     memeData2.unshift({id:Math.random(55555555),text:this.state.text,name:this.state.username,url:this.state.imageurl,time:new Date()})
      this.setState({memeData:memeData2,username:"",imageurl:"",text:""})
    }else{
      Swal.fire('Something went wrong on our end')
    }
  })
  .catch(error => console.log('error', error));
      }else{
        console.log("Missing required field")
      }
      
      }
  render() {
    return (
      <div>
        <MDBCardHeader className="mx-auto" >XMeme</MDBCardHeader>
        <MDBContainer className="mx-auto">
      <MDBRow>
        <MDBCol md="6" className="mx-auto">
          <MDBCard>
            <div className="header pt-3 peach-gradient">
              <MDBRow className="d-flex justify-content-center">
                <h3 className="white-text mb-3 pt-3 font-weight-bold">
                  Add Meme
                </h3>
              </MDBRow>
            </div>
            <MDBCardBody className="mx-4 mt-4">
              <MDBInput label="Your Name" group type="text" value={this.state.username} validate onChange={this.myChangeHandler1}/>
              <MDBInput label="Your Text" group type="text" value={this.state.text} validate onChange={this.myChangeHandler2} />
              <MDBInput label="Your Meme Url" group type="text" value={this.state.imageurl} validate onChange={this.myChangeHandler3} />
              <MDBRow className="d-flex align-items-center mb-4 mt-5">
                <MDBCol md="5" className="d-flex align-items-start">
                  <div className="text-center">
                    <MDBBtn
                      color="grey"
                      rounded
                      type="button"
                      className="z-depth-1a"
                      onClick={this.saveResponse}
                    >
                      Add
                    </MDBBtn>
                  </div>
                </MDBCol>
                <MDBCol md="7" className="d-flex justify-content-end">
                  
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    <br/>
    <MDBContainer className="col-lg-11">

            <MDBRow>
       
       
       {this.state.memeData.map((data,id) => {
         return( <MDBCol className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mx-auto mt-5" key={id} >
         <MDBCard wide>
           <MDBCardImage cascade className="img-fluid" src={data.url}  width="100%" style={{height:"200px"}}/>
           <MDBCardBody cascade>
             <MDBCardTitle>{data.text}</MDBCardTitle>
             <MDBCardText>-{data.name}</MDBCardText>
           </MDBCardBody>
           <div className='rounded-bottom mdb-color lighten-3 text-center pt-3'>
            <ul className='list-unstyled list-inline font-small mx-auto'>
              <li className='list-inline-item pr-2 white-text'>
                <MDBIcon far icon='clock' /> {new Date(data.time).toLocaleString()}
              </li> 
            </ul>
          </div>

         </MDBCard>
       </MDBCol>)
       })
        }

      </MDBRow>
      </MDBContainer>
      </div>
    )
  }
}

export default App;