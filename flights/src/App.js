import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3.js';
import flights from './flights';
import PieExample from './pie';
import {Pie} from 'react-chartjs-2';
import {Line} from 'react-chartjs-2';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      airplaneName: '',
      partName: '',
      message: '',
      currentPlane: '',
      airplaneID: 0,
      airlineName: '',
      ownerName: '',
      numberOfAirplanes: '',
      name: [],
      newArray: [],
      airplaneList: [],
      cost: '',
      revision: '',
      Manufacturer: '',
      status: '',
      partID: '',
      airplaneNameList: [],
      partCount: '',
      insuranceInfo: '',
      flightInfo: '',
      partNameList: [],
      partList: [],
      insuranceYear: 0,
      insuranceCost: 0,
      insuranceType: '',
      flightSource: '',
      flightDestination: '',
      flightHours: 0,
      flightFlownInformation: [],
      flightCount: 0,
      insuranceInfo: [],
      flightInsuranceInfo: [],
      data: {datasets: [], labels: []},
      manfNameList: [],
      manfPartPriceList: [],
      lineData: {datasets: [], labels: []},
      flightLabelInfo: [],
      flightLineData: [],
      insuranceLineData: {datasets: [], labels: []},
      insuranceLabelInfo: [],
      insuranceDataInfo: [],
    };
    
  }



  async componentDidMount(){
    const ownerName = await flights.methods.getOwner().call();
    const numberOfAirplanes = await flights.methods.getCount().call();
    
    this.setState({airplaneID: 1});
    
    this.setState({ownerName, numberOfAirplanes});

     for (var i = 1; i <= this.state.numberOfAirplanes; i++) {
        const airplaneList = await flights.methods.getAirplane(i).call();
        this.setState({airplaneList});
        const airplaneNameList = this.state.airplaneNameList.concat([this.state.airplaneList]);   
        this.setState({airplaneNameList});
    }
    

   

  }
   componentWillUnmount() {
    if (this.timeout) {
      clearInterval(this.timeout);
    }
  }

  //Form handling functions
  onEnter = async event  => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    await flights.methods.setAirplane(this.state.airplaneName,this.state.airlineName).send({from:accounts[0]});

    this.setState({ message: 'A new plane has been entered' });

    //Get the new airplane list
    
  };

  onMaintain = async event => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    await flights.methods.setPart(this.state.airplaneID,this.state.Manufacturer,this.state.status,this.state.revision,this.state.cost).send({from:accounts[0]});

    this.setState({ message: 'A new plane has been entered' });
  };

  handleInsurance = async event => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    await flights.methods.setInsurance(this.state.airplaneID,this.state.insuranceType,this.state.insuranceCost,this.state.insuranceYear).send({from:accounts[0]});

    this.setState({ message: 'A new plane has been entered' });
  };

  handleFlightInformation = async event => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    await flights.methods.setFlight(this.state.airplaneID,this.state.flightSource,this.state.flightDestination,this.state.flightHours).send({from:accounts[0]});

    this.setState({ message: 'A new plane has been entered' });
  };

  handlePlaneLogs = async event => {
        event.preventDefault();
        
        /* Get Part Information for the given plane ID */
        this.setState({airplaneID: event.target.value});
        await flights.methods.getAirplane(this.state.airplaneID).call();
        const airplaneName = await flights.methods.getAirplane(this.state.airplaneID).call();
        this.setState({airplaneName: airplaneName[0]});
        
        

        const partCount = await flights.methods.getPartCount(this.state.airplaneID).call();
        this.setState({partCount});
          
        this.setState({partCount: await flights.methods.getPartCount(this.state.airplaneID).call()});
        
        //reset state
        this.setState({ partList: [], partNameList: []  })
        // Getting the part Information
        for (var i = 0; i < this.state.partCount; i++) {
          const partList = await flights.methods.getPartInfo(this.state.airplaneID,i).call();
          this.setState({partList});
          
          const partNameList = this.state.partNameList.concat([this.state.partList]);   
          this.setState({partNameList});
      }
       
      /* Get Flight Information for the given plane ID */
        
        const flightCount = await flights.methods.getFlightCount(this.state.airplaneID).call();
        this.setState({flightCount});
        

        //reset state
        this.setState({ flightInfo: [], flightFlownInformation: [], flightLabelInfo: [], flightLineData: []  })
        // Getting the Flight Information
        for (var i = 0; i < this.state.flightCount; i++) {
          const flightInfo = await flights.methods.getFlightInfo(this.state.airplaneID,i).call();
          this.setState({flightInfo});
          
          const flightFlownInformation = this.state.flightFlownInformation.concat([this.state.flightInfo]);
          const flightLabelInfo = this.state.flightLabelInfo.concat([this.state.flightInfo[1]+" TO "+this.state.flightInfo[2]]);
          const flightLineData = this.state.flightLineData.concat([this.state.flightInfo[3]]);
          this.setState({flightFlownInformation, flightLabelInfo,flightLineData});

        
        }
        



        // Getting the part Information

        //reset state
        this.setState({ manfNameList: [], manfPartPriceList: [] , lineData: {datasets: [], labels: []}, data: {datasets: [], labels: []} })
        for (var i = 0; i < this.state.partCount; i++) {
          const partList = await flights.methods.getPartInfo(this.state.airplaneID,i).call();
          this.setState({partList});

          const manfNameList = this.state.manfNameList.concat([this.state.partList[1]]);
          const manfPartPriceList = this.state.manfNameList.concat([this.state.partList[4]]);   
          this.setState({manfNameList,manfPartPriceList });
      }

       
          const data = {
                        labels: this.state.manfNameList,
                        datasets: [{
                          data: this.state.manfPartPriceList,
                          backgroundColor: [
                          '#FF6384',
                          '#36A2EB',
                          '#FFCE56'
                          ],
                          hoverBackgroundColor: [
                          '#FF6384',
                          '#36A2EB',
                          '#FFCE56'
                          ]
                        }]
          };
        this.setState({data});

         const lineData = {
            labels: this.state.flightLabelInfo,
            datasets: [
              {
                label: 'Flight flown hours',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.state.flightLineData
              }
            ]
          };
        
      this.setState({lineData});
      
 

       /* Get Insurance Information for the given plane ID */
        
        const insuranceCount = await flights.methods.getInsuranceCount(this.state.airplaneID).call();
        this.setState({insuranceCount});

         //reset state
        this.setState({ flightInsuranceInfo: [], insuranceLabelInfo: [] , insuranceDataInfo: [] , insuranceLineData: {datasets: [], labels: []} })
        
        // Getting the Flight Information
        for (var i = 0; i < this.state.insuranceCount; i++) {
          const insuranceInfo = await flights.methods.getInsuranceInfo(this.state.airplaneID,i).call();
          this.setState({insuranceInfo});
          
          const flightInsuranceInfo = this.state.flightInsuranceInfo.concat([this.state.insuranceInfo]);
          const insuranceLabelInfo =  this.state.flightInsuranceInfo.concat([this.state.insuranceInfo[1]]);
          const insuranceDataInfo = this.state.flightInsuranceInfo.concat([this.state.insuranceInfo[2]]);
          this.setState({flightInsuranceInfo, insuranceLabelInfo, insuranceDataInfo});
      }

               const insuranceLineData = {
                  labels: this.state.insuranceLabelInfo,
                  datasets: [
                    {
                      label: 'Flight Insurance Information',
                      fill: false,
                      lineTension: 0.1,
                      backgroundColor: 'rgba(75,192,192,0.4)',
                      borderColor: 'rgba(75,192,192,1)',
                      borderCapStyle: 'butt',
                      borderDash: [],
                      borderDashOffset: 0.0,
                      borderJoinStyle: 'miter',
                      pointBorderColor: 'rgba(75,192,192,1)',
                      pointBackgroundColor: '#fff',
                      pointBorderWidth: 1,
                      pointHoverRadius: 5,
                      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                      pointHoverBorderColor: 'rgba(220,220,220,1)',
                      pointHoverBorderWidth: 2,
                      pointRadius: 1,
                      pointHitRadius: 10,
                      data: this.state.insuranceDataInfo
                    }
                  ]
                };
        
      this.setState({insuranceLineData});


      
  };
 

  render() {
    
    return (


    



<div>
        
  <div className="wrapper">

    <div className="main-panel">

      <div className="content">

        
        <div className="container-fluid" >


          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header card-header-primary">
                  <h4 className="card-title">Airplanes</h4>
                  <p className="card-category">Add an Airplane</p>
                </div>
                <div className="card-body">
                  <form onSubmit={this.onEnter}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="bmd-label-floating">Name</label>
                          <input className="form-control"
                            value={this.state.airplaneName}
                            onChange={event => this.setState({ airplaneName: event.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">

                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="bmd-label-floating">Airline</label>
                          <input className="form-control"
                             value={this.state.airlineName}
                               onChange={event => this.setState({ airlineName: event.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                    <button className="btn btn-primary pull-right">Enter</button>
                    <div className="clearfix">
                  
                    </div>
                  </form>
                </div>
              </div>
            </div>
          
        



           
        
          
            <div className="col-md-6">
              <div className="card">
                <div className="card-header card-header-primary">
                  <h4 className="card-title">Select a flight</h4>
                   <p className="card-category"> Add a part for this flight</p>
                </div>
                <div className="card-body">
                <hr/>
        
                <select onChange={this.handlePlaneLogs} className="btn btn-primary pull-right">
                  {
                    this.state.airplaneNameList.map( (airplane,index) =>{
                      return(
                        <option value={index+1} key={index}> {airplane[0]}, {index+1} </option>
                      );
                    })
                  }
                  </select>
                <hr/>
                </div>
              </div>
            </div>
          </div>



        <div className="row">


            <div className="col-md-6">
              <div className="card">
                <div className="card-header card-header-primary">
                      <h4 className="card-title">Add Insurance Information for flight {this.state.airplaneName}</h4>
                      <p className="card-category">Update Insurance Information</p>
                </div>
                <div className="card-body">
                  <form onSubmit={this.handleInsurance}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                              <label className="bmd-label-floating">Type Of Insurance</label>
                              <input  className="form-control"
                                  value={this.state.insuranceType}
                                  onChange={event => this.setState({ insuranceType: event.target.value })}
                                  hidden="hidden"
                                />
                                   <select onChange={event => this.setState({ insuranceType: event.target.value })} className="btn btn-primary pull-right">
                                      <option value="Taxiing">Taxiing</option>
                                     
                                     <option value="Liability Insurance">Liability Insurance</option>
                                    <option value="Combined Single Limit">Combined Single Limit</option>
                                    <option value="In Flight Insurance">In Flight Insurance</option>

                                  </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">

                              <label className="bmd-label-floating">Cost Of Insurance</label>
                              <input  className="form-control"
                                  value={this.state.insuranceCost}
                                  onChange={event => this.setState({ insuranceCost: event.target.value })}
                                  
                                   />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="bmd-label-floating">Expiration Year</label>
                              <input  className="form-control"
                                  value={this.state.insuranceYear}
                                  onChange={event => this.setState({ insuranceYear: event.target.value })}
                                  
                                   />
                      </div>
                    </div>
                        
                  </div>
                      <button className="btn btn-primary pull-right">Enter</button>
                      <div className="clearfix">
                      </div>
                  </form>
                </div>
              </div>
            </div>

          <div className="col-md-6">
              <div className="card">
                <div className="card-header card-header-primary">
                  <h4 className="card-title">Insurance Information</h4>
                   <p className="card-category">All Information Related Information</p>
                </div>
                <div className="card-body">
                <hr/>
                  <Line data={this.state.insuranceLineData} />

                <hr />
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th className="text-center">No.</th>
                      <th className="text-center">Insurance Number</th>
                      <th className="text-center">Type</th>
                      <th className="text-center">Cost</th>
                      <th className="text-center">Expiration Year</th>
                    </tr>
                    {
                    this.state.flightInsuranceInfo.map( (insurance,index) =>{
                      return(
                        <tr key={index}> 
                          <td className="text-center">{index+1}</td>
                          <td className="text-center">{insurance[0]}</td> 
                          <td className="text-center">{insurance[1]}</td>
                          <td className="text-center">{insurance[2]}</td>
                          <td className="text-center">{insurance[3]}</td>
                          <td className="text-center">{insurance[4]}</td>
                        </tr>
                      );
                    })
                  }
                  <tr>
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                  </tr>
                  </tbody>
                </table>
                <hr/>
                </div>
              </div>
            </div>
          </div>
          
        




        
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header card-header-primary">
                      <h4 className="card-title">Add a record regarding maintainence for flight {this.state.airplaneName} of {this.state.airlineName} airlines</h4>
                      <p className="card-category">Add a part</p>
                </div>
                <div className="card-body">
                  <form onSubmit={this.onMaintain}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                      <label className="bmd-label-floating">Description: </label>
                      <input  className="form-control"
                                  value={this.state.Manufacturer}
                                  onChange={event => this.setState({ Manufacturer: event.target.value })}
                                  hidden="hidden"
                                   />
                                   <select onChange={event => this.setState({ Manufacturer: event.target.value })} className="btn btn-primary pull-right">
                                   <option value="Actuator">Actuator</option>
                                   <option value="Avionics">Avionics</option>
                                  <option value="Landing Gear">Landing Gear</option>
                                  <option value="Glass">Windshield / Glass</option>
                                  <option value="Housing">Housing</option>
                                  <option value=" Nut Assy">Nut Assy</option>
                                  </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                              <label className="bmd-label-floating">Plane ID</label>
                              <input className="form-control"
                              value={this.state.airplaneID}
                              onChange={event => this.setState({ airplaneID: event.target.value })}/>
                      </div>
                    </div>
                  </div>


                  <div className="row">
                    <div className="col-md-2">
                      <div className="form-group">
                              <label className="bmd-label-floating">Revision</label>
                              <input className="form-control" value={this.state.revision}
                              onChange={event => this.setState({ revision: event.target.value })} />
                      </div>
                    </div>
                  </div>


                  <div className="row">
                    <div className="col-md-2">
                      <div className="form-group">
                              <label className="bmd-label-floating">Status</label>
                              <input  className="form-control" value={this.state.status}
                              onChange={event => this.setState({ status: event.target.value })}
                              hidden = "hidden"
                              />
                              <select onChange={event => this.setState({ status: event.target.value })} className="btn btn-primary pull-right">
                              <option value="1">Success</option>
                              <option value="2">Under Review</option>
                              </select>
                      </div>
                    </div>
                  </div>


                  <div className="row">
                    <div className="col-md-2">
                      <div className="form-group">
                              <label className="bmd-label-floating">Cost</label>
                              <input className="form-control" value={this.state.cost}
                            onChange={event => this.setState({ cost: event.target.value })} />
                      </div>
                    </div>
                  </div>


                    <button className="btn btn-primary pull-right">Enter</button>
                  <div className="clearfix">
                          
                  </div>
                  </form>
                 
                </div>
              </div>
            </div>


            <div className="col-md-6">
              <div className="card">
                <div className="card-header card-header-primary">

                  <h4 className="card-title ">Maintenance Logs</h4>
                   <p className="card-category"> Select a flight to display Maintanence Logs</p>
                </div>
                <div className="card-body"> 
                <hr/>
                  
                  
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th>No.</th>
                      <th>Part ID</th>
                      <th>Manufacturer ID</th>
                      <th>Status</th>
                      <th>Revision Number</th>
                      <th>Cost</th>
                    </tr>
                    {
                    this.state.partNameList.map( (part,index) =>{
                      return(
                        <tr key={index}> 
                          <td className="text-center">{index+1}</td>
                          <td className="text-center">{part[0]}</td> 
                          <td className="text-center">{part[1]}</td>
                          <td className="text-center">{part[2]}</td>
                          <td className="text-center">{part[3]}</td>
                          <td className="text-center">{part[4]}</td>
                        </tr>
                      );
                    })
                  }
                  <tr>
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                  </tr>
                  </tbody>
                </table>
                <hr/>
                
                 <Pie data={this.state.data} />
                 
                </div>
              </div>
            </div>

          </div>
          
    



       
          

  


       
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header card-header-primary">
                      <h4 className="card-title">Add flight information for {this.state.airplaneName}</h4>
                      <p className="card-category">Update Flight Information</p>
                </div>
                <div className="card-body">
                  <form onSubmit={this.handleFlightInformation}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                              <label className="bmd-label-floating">Source</label>
                              <input  className="form-control"
                                  value={this.state.flightSource}
                                  onChange={event => this.setState({ flightSource: event.target.value })}
                                />     
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                              <label className="bmd-label-floating">Destination</label>
                              <input  className="form-control"
                                  value={this.state.flightDestination}
                                  onChange={event => this.setState({ flightDestination: event.target.value })}
                                  
                                   />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                              <label className="bmd-label-floating">Flight Hours</label>
                              <input  className="form-control"
                                  value={this.state.flightHours}
                                  onChange={event => this.setState({ flightHours: event.target.value })}
                                   />
                        </div>
                      </div>
                        
                    </div>
                        <button className="btn btn-primary pull-right">Enter</button>
                        <div className="clearfix"></div>
                  </form>
                </div>
              </div>
            </div>
<div className="col-md-6">
              <div className="card">
                <div className="card-header card-header-primary">

                  <h4 className="card-title ">Flight Logs</h4>
                   <p className="card-category"> Select a flight to display Flight Logs</p>
                </div>
                <div className="card-body"> 
                <hr/>
                  
                <Line data={this.state.lineData} />
                <hr />
                
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th>No.</th>
                      <th>Source</th>
                      <th>Destination</th>
                      <th>Hours Flown</th>
                      
                    </tr>
                      {
                      this.state.flightFlownInformation.map( (flight,index) =>{
                        return(
                          <tr key={index+1}> 
                            <td className="text-center">{index+1}</td>
                            
                            <td className="text-center">{flight[1]}</td>
                            <td className="text-center">{flight[2]}</td>
                            <td className="text-center">{flight[3]}</td>
                            
                          </tr>
                        );
                      })
                    }
                    <tr>
                      <td>---</td>
                      <td>---</td>
                      <td>---</td>
                      <td>---</td>
                      <td>---</td>
                      <td>---</td>
                    </tr>
                  </tbody>
                </table>

                <hr/>  
                </div>
              </div>
            </div>
          

                      




       
          

          </div>
        </div>

      </div>
    </div>
  </div>
</div>




 
  














    );
  }
}




export default App;
