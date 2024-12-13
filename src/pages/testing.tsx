import { set } from "date-fns";
import React, { useState } from "react";

export default function Testing() {
  const [value, setValue] = useState("");
  return (
    <div>
      {/* <textarea
        value={value}
        onChange={(e) => {
          // console.log("e", e.target.value);
          setValue(e.target.value);
          console.log("value", value, e.target.value);
        }}
        placeholder={"this is placeholder"}
        rows={1}
      /> */}
      {/* 
      <textarea
        name={"date"}
        type="date"
        value={value}
        onChange={(e) => {
          console.log("e", e.target.value);
          // onChange(e.target.value);
        }}
        placeholder={"this is place"}
        className={""}
        // rows={1}
      /> */}

      <input
        type="date"
        value={value}
        onChange={(e) => {
          console.log("e", e.target.value);
          setValue(e.target.value);
        }}
        id="birthday"
        name="birthday"
      />
    </div>
  );
}
