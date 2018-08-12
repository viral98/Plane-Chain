pragma solidity ^0.4.24;

contract Maintenance {
    uint planecount;
    struct Part {
        uint partid;
        string manufacturer; //will use numbers to show manufacturers, since string will take a lot fo space
        uint status;
        uint rev; //revision number
        uint cost;
        uint usehours;
    }
    
    struct Flight {
        uint flightid;
        string source;
        string destination;
        uint travelhours;
    }
    
    struct Insurance {
        uint insuranceid;
        string typeofins;
        uint cost;
        uint year;
    }
    
    struct Airplane {
        //uint id;
        string name;
        string airline;
        uint partcount;
        uint totalcost;
        uint flightcount;
        uint insurancecount;
        Part[] parts;
        Flight[] flights;
        Insurance[] insurances;
    }
    
    
    
    event addAirplane(
        string name,
        string airline,
        uint id
    );
    
    event addPart(
        uint partid,
        uint planeid,
        string manufacturer,
        uint cost,
        uint totalcost
    );
    
    event addFlight(
        uint flightid,
        uint planeid,
        string source,
        string destination,
        uint travelhours
    );
    
    event addInsurance(
        uint insuranceid,
        uint planeid,
        string typeofins,
        uint cost,
        uint travelhours
    );
    
    address owner;
    
    constructor() public {
        owner=msg.sender;
    }
    
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    
    mapping (uint => Airplane) airplanes;
    uint[] public AirplanesList;
    
    function setAirplane( string _name, string _airline) public onlyOwner  {
        var id=planecount+1;
        var plane = airplanes[id];
        plane.name = _name;
        plane.airline= _airline;
        plane.partcount=0;
        plane.totalcost=0;
        AirplanesList.push(id) -1;
        planecount++;
        emit addAirplane(_name,_airline,id);
    }
    
    function getCount() view public returns(uint) {
        return (planecount);
    }
    
    function getAirplane(uint _id) view public returns (string, string, uint, uint, uint, uint) {
        return(airplanes[_id].name,airplanes[_id].airline,airplanes[_id].partcount, airplanes[_id].flightcount, airplanes[_id].insurancecount, airplanes[_id].totalcost);
    }
    
    function setPart(uint _planeid, string _manufacturer, uint _status, uint _rev, uint _cost) public onlyOwner  {
        Part memory temp;
        var id = airplanes[_planeid].partcount;
        temp.partid=id;
        temp.manufacturer=_manufacturer;
        temp.rev=_rev;
        temp.status=_status;
        temp.cost=_cost;
        
        airplanes[_planeid].parts.push(temp);
        airplanes[_planeid].partcount++;
        airplanes[_planeid].totalcost=airplanes[_planeid].totalcost+_cost;
        emit addPart(id, _planeid, _manufacturer, _cost, airplanes[_planeid].totalcost);
    }
    
    
    function getPartInfo(uint _planeid,uint index) view public returns (uint,string,uint,uint, uint,uint) {
        return(airplanes[_planeid].parts[index].partid,airplanes[_planeid].parts[index].manufacturer, airplanes[_planeid].parts[index].status, airplanes[_planeid].parts[index].rev, airplanes[_planeid].parts[index].cost, airplanes[_planeid].parts[index].usehours);
    }
    
    function setFlight(uint _planeid, string _source, string _destination, uint _travelhours) public onlyOwner  {
        Flight memory temp;
        var id = airplanes[_planeid].flightcount;
        temp.flightid=id;
        temp.source=_source;
        temp.destination=_destination;
        temp.travelhours=_travelhours;
        
        airplanes[_planeid].flights.push(temp);
        airplanes[_planeid].flightcount++;
        
        for(uint i=0;i<airplanes[_planeid].partcount;i++) {
             airplanes[_planeid].parts[i].usehours=airplanes[_planeid].parts[i].usehours+_travelhours;
        }
        
        emit addFlight(id, _planeid, _source, _destination, _travelhours);
    }

    function getFlightInfo(uint _planeid,uint _index) view public returns(uint, string, string, uint) {
        return(airplanes[_planeid].flights[_index].flightid, airplanes[_planeid].flights[_index].source, airplanes[_planeid].flights[_index].destination,airplanes[_planeid].flights[_index].travelhours);        
    }
    
    function setInsurance(uint _planeid, string _typeofins, uint _cost, uint _year) public onlyOwner  {
        Insurance memory temp;
        var id = airplanes[_planeid].insurancecount;
        temp.insuranceid=id;
        temp.typeofins=_typeofins;
        temp.cost=_cost;
        temp.year=_year;
        
        airplanes[_planeid].insurances.push(temp);
        airplanes[_planeid].insurancecount++;
        emit addInsurance(id, _planeid, _typeofins, _cost, _year);
    }
    
    function getInsuranceInfo(uint _planeid, uint _index) view public returns(uint,string,uint,uint) {
        return( airplanes[_planeid].insurances[_index].insuranceid, airplanes[_planeid].insurances[_index].typeofins,airplanes[_planeid].insurances[_index].cost,airplanes[_planeid].insurances[_index].year);
    }
    
    function getPartCount(uint _planeid) view public returns(uint) {
        return(airplanes[_planeid].partcount);
    }
    
    function getFlightCount(uint _planeid) view public returns(uint) {
        return(airplanes[_planeid].flightcount);
    }
    
    function getInsuranceCount(uint _planeid) view public returns(uint) {
        return(airplanes[_planeid].insurancecount);
    }

    function getOwner() view public returns(address) {
        return owner;
    }
   
   function compareStringsbyBytes(string s1, string s2) public pure returns(bool){
    return keccak256(s1) == keccak256(s2);
   }
    
    function getIDbyName(string _name) view public returns(uint) {
        uint c = AirplanesList.length;
        for(uint i =0;i<=c;i++) {
            if(compareStringsbyBytes(airplanes[i].name,_name)) {
                return i;
            }
        }
        return 999;
    }
    
}