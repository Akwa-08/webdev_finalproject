import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'


function App() {
  const [passengers, setPassengers] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [sales, setSales] = useState(0);
  const [bus1, setBus1] = useState([]);
  const [bus2, setBus2] = useState([]);
  const [bus3, setBus3] = useState([]);
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [newPass, setNewPass] = useState('');


  useEffect (()=> {

    const getPassengers = async () => {
      try{
        const result = await fetch('https://my-json-server.typicode.com/troy1129/jsonplaceholder/passengers')
        const parsedData = await result.json()
        setPassengers(parsedData)

      } catch(e) {}
        console.log("Passengers Retrieval: " + e)
    }

    const getDestinations = async () => {
      try{
        const result = await fetch('https://my-json-server.typicode.com/troy1129/jsonplaceholder/destinations')
        const parsedData = await result.json()
        setDestinations(parsedData)
      } catch (e) {
        console.log("Destinations Retrieval: " + e)
      }
    }
    getPassengers()
    getDestinations()
  }, []);

  
  const queueTo = (des, pass) => {
      setSales(sales + des.price)

      if(des.id == 1 || des.id == 2){
        const updatedBus = [...bus1, pass];
        setBus1(updatedBus);
      } else if(des.id == 3 || des.id == 4) { 
        const updatedBus = [...bus2, pass];
        setBus2(updatedBus);
      } else if(des.id == 5 || des.id == 6) { 
        const updatedBus = [...bus3, pass];
        setBus3(updatedBus);
      }

      const updatedPass = passengers.filter((passenger) => passenger.id!== pass.id);
      setPassengers(updatedPass);
  };

 

  const addPass = (pass) => {
    const passID = passengers.length ? passengers[passengers.length - 1].id + 1 : 1;
    const newPass = {passID, checked:false, pass};
    const updatePass = {...passengers, newPass};
    setPassengers(updatePass);
  }


  return (
    <>

    {/* component for sales counter */}
    <div className="sales">
      <h2>Sales: P{sales}</h2>
    </div>

    {/* component for add passenger form */}
    <div className="passForm">
      <form >   
            <h2> Queue Passenger </h2>
            <div class="formcontainer"> 
              <div class="container">
                <label label="name">Name:</label><br/>
                <input type="text" id="name" value={name} name="name" onChange={(e) => setName(e.target.value)}/><br/>
                <label label="ticketID">Ticket ID:</label><br/>
                <input type="number" id="ticketID" value={id} name="ticketID" onChange={(e) => setId(e.target.value)}/><br/>
                <button type="submit" aria-label="Add Item" onClick={addPass}>Queue</button>
              </div>
          </div>
      </form>
    </div>

    {/* component for queue */}
      {passengers.length > 0 && (
        <div className="queue">

          {/* component for tickets */}
          {passengers.map(passenger => (
            <div className="ticket" key={passenger.id}>
              <p>{passenger.name}</p>
              <p>Ticket ID: {passenger.id}</p>

                {destinations.length > 0 && (
                <div>
                  {destinations.map(destination => (
                    <button key={destination.id} onClick={() => queueTo(destination, passenger)}>{destination.destination}<br/>P {destination.price}</button>
                  ))}
                </div>          
                )}
            
            </div>
          ))}
        </div>
        
      )}

    {/* component for bus view */}
    <div className= "busview">
      <div classname="bus">
          <h3> BUS 1 : CEBU and MANDAUE</h3>
          {bus1.length > 0 && (
            <div>
              {bus1.map(bus => (
                <div className="ticket" key={bus.id}>
                  <p>{bus.name}</p>
                  <p>Ticket ID: {bus.id}</p>
                </div>
              ))}
            </div>  
          )}
      </div>
      <div classname="bus">
          <h3> BUS 2 : LILO-AN and LAPU-LAPU</h3>
          {bus2.length > 0 && (
            <div>
              {bus2.map(bus => (
                <div className="ticket" key={bus.id}>
                  <p>{bus.name}</p>
                  <p>Ticket ID: {bus.id}</p>
                </div>
              ))}
            </div>  
          )}
      </div>
      <div classname="bus">
          <h3> BUS 3 : CONSOLACION and TALISAY</h3>
          {bus3.length > 0 && (
            <div>
              {bus3.map(bus => (
                <div className="ticket" key={bus.id}>
                  <p>{bus.name}</p>
                  <p>Ticket ID: {bus.id}</p>
                </div>
              ))}
            </div>  
          )}
      </div>
    </div>

    </>
  );
}

export default App
