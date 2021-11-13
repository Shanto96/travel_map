import React, { useState, useEffect, useRef } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room, Star } from "@material-ui/icons";
import { format } from "timeago.js";
import "./App.css";

import axios from "axios";
function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 23.502978,
    longitude: 91.173412,
    zoom: 4,
  });
  const [showPopup, togglePopup] = useState(true);
  const [pins, setPins] = useState([]);
  const [selectedPin, setSelectedPin] = useState(null);
  const [newLocation, setNewLocation] = useState(null);
  const locationTitle = useRef();
  const locationDesc = useRef();
  const rating = useRef();

  const locationSelector = (e, id, lat, long) => {
    setSelectedPin(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };
  const currnetUsername = "kibrias";

  const newLocationSelector = (e) => {
    setNewLocation({ lat: e.lngLat[1], long: e.lngLat[0] });
  };
  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPins();
  }, []);

  const addNewLocation = async (e) => {
    e.preventDefault();

    let obj = {
      userName: "kibria",
      title: locationTitle?.current.value,
      desc: locationDesc?.current.value,
      rating: rating?.current.value,
      lat: newLocation.lat,
      long: newLocation.long,
    };
    try {
      let res = await axios.post("/pins/", obj);
      setPins([...pins, res.data]);
      setNewLocation(null);

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
        onDblClick={newLocationSelector}
      >
        {pins.map((pin) => (
          <>
            <Marker
              latitude={pin.lat}
              longitude={pin.long}
              offsetLeft={-viewport.zoom * 3.5}
              offsetTop={-viewport.zoom * 3.5}
              onClick={(e) => locationSelector(e, pin._id, pin.lat, pin.long)}
              transitionDuration="400"
            >
              <Room
                style={{
                  fontSize: viewport.zoom * 7,
                  color: currnetUsername == pin.userName ? "aqua" : "purple",
                }}
              />
            </Marker>
            {selectedPin === pin._id && (
              <Popup
                latitude={pin.lat}
                longitude={pin.long}
                closeButton={true}
                closeOnClick={false}
                onClose={(e) => {
                  locationSelector(e, null, pin.lat, pin.long);
                }}
                anchor="left"
              >
                <div className="card">
                  <label>Title</label>
                  <h2 className="title"> {pin.title}</h2>
                  <label htmlFor=""> Description </label>
                  <p className="desc"> {pin.desc} </p>
                  <label htmlFor="">Rating</label>
                  <div className="star">
                    {Array(pin.rating).fill(  <Star style={{ color: "gold" }} />)}
                  
                    
                  </div>
                  <div className="user">
                    created By <span className="username">{pin.userName}</span>
                  </div>
                  <div className="date">{format(pins.createdAt)}</div>
                </div>
              </Popup>
            )}
          </>
        ))}
        {newLocation && (
          <Popup
            latitude={newLocation.lat}
            longitude={newLocation.long}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewLocation(null)}
            anchor="left"
          >
            <div className="card">
              <form action="" className="add-form" onSubmit={addNewLocation}>
                <label htmlFor="">Title</label>
                <input
                  type="text"
                  classname="title"
                  placeholder="Enter Place Title"
                  ref={locationTitle}
                />
                <label htmlFor="description">Description</label>
                <textarea
                  name=""
                  id=""
                  cols=""
                  rows="2"
                  placeholder="Enter something about this place"
                  ref={locationDesc}
                ></textarea>
                <label htmlFor=""> Rating </label>
                <select name="" id="" ref={rating}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="add-place-button" type="submit">
                  Add New Place
                </button>
              </form>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}

export default App;
