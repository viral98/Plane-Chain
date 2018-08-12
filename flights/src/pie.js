import React from 'react';
import {Pie} from 'react-chartjs-2';
import  { Component } from 'react';

class pie extends Component{

    constructor(props){
       super(props);
       this.state = {
       		data: [],
       };
		
      

    }

  async componentDidMount(){
   	const data = {
			labels: [
				'Red',
				'Green',
				'Yellow'
			],
			datasets: [{
				data: [300, 50, 100],
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
   }

    render(){
        
        return(
            <div>
                      <div>
				        <h2>Part -- Flown Hours</h2>
				        <Pie data={this.state.data} />
				      </div>
            </div>
        );
    }
}
export default pie;




