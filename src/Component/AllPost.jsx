import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Queries from "./Queries";
import Feed from "./Feed";

export default function AllPost() {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
  
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    fetch(`${BASE_URL}/getinfo`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((data) => data.json())
      .then((userData) => {
        setUser(userData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const [whichQuery, setwhichQuery] = React.useState("all");

  const handleChange = (event, newwhichQuery) => {
    setwhichQuery(newwhichQuery);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <ToggleButtonGroup
        style={{marginTop:"10vh"}}
        color="primary"
        value={whichQuery}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="all">All Queries</ToggleButton>
        {Object.entries(user).length === 0 ? null : (
          <ToggleButton value="my">My Queries</ToggleButton>
        )}
      </ToggleButtonGroup>

      {whichQuery === 'all' ? <Queries /> : <Feed />}
    </div>
  );
}
