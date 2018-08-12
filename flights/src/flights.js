import web3 from './web3';

const address = '0x8eef39fd1742c3ac2a0bf17b7c522f7a576022a2';

const abi = [
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "AirplanesList",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "airline",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "addAirplane",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "partid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "planeid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "manufacturer",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "cost",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "totalcost",
          "type": "uint256"
        }
      ],
      "name": "addPart",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "flightid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "planeid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "source",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "destination",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "travelhours",
          "type": "uint256"
        }
      ],
      "name": "addFlight",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "insuranceid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "planeid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "typeofins",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "cost",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "travelhours",
          "type": "uint256"
        }
      ],
      "name": "addInsurance",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_name",
          "type": "string"
        },
        {
          "name": "_airline",
          "type": "string"
        }
      ],
      "name": "setAirplane",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getCount",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "getAirplane",
      "outputs": [
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_planeid",
          "type": "uint256"
        },
        {
          "name": "_manufacturer",
          "type": "string"
        },
        {
          "name": "_status",
          "type": "uint256"
        },
        {
          "name": "_rev",
          "type": "uint256"
        },
        {
          "name": "_cost",
          "type": "uint256"
        }
      ],
      "name": "setPart",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_planeid",
          "type": "uint256"
        },
        {
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "getPartInfo",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_planeid",
          "type": "uint256"
        },
        {
          "name": "_source",
          "type": "string"
        },
        {
          "name": "_destination",
          "type": "string"
        },
        {
          "name": "_travelhours",
          "type": "uint256"
        }
      ],
      "name": "setFlight",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_planeid",
          "type": "uint256"
        },
        {
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "getFlightInfo",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_planeid",
          "type": "uint256"
        },
        {
          "name": "_typeofins",
          "type": "string"
        },
        {
          "name": "_cost",
          "type": "uint256"
        },
        {
          "name": "_year",
          "type": "uint256"
        }
      ],
      "name": "setInsurance",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_planeid",
          "type": "uint256"
        },
        {
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "getInsuranceInfo",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_planeid",
          "type": "uint256"
        }
      ],
      "name": "getPartCount",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_planeid",
          "type": "uint256"
        }
      ],
      "name": "getFlightCount",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_planeid",
          "type": "uint256"
        }
      ],
      "name": "getInsuranceCount",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getOwner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "s1",
          "type": "string"
        },
        {
          "name": "s2",
          "type": "string"
        }
      ],
      "name": "compareStringsbyBytes",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "getIDbyName",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
]

export default new web3.eth.Contract(abi,address);