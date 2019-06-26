import React, { FormEvent } from "react";
import axios from "axios";

type Value = {
  [index: string]: number;
};

const Fb: React.FC = () => {
  const [index, setIndex] = React.useState<string>();
  const [seenIndexes, setIndexes] = React.useState<number[]>([]);
  const [values, setValues] = React.useState<Value>();

  const fetchValues = async () => {
    const values = await axios.get("/api/values/current");
    setValues(values.data);
  };

  const fetchIndexes = async () => {
    const seenIndexes = await axios.get("/api/values/all");
    const nums = seenIndexes.data.map((num:{number:number})=>{
      return num.number
    })
    setIndexes(nums);
  };
  
  React.useEffect(() => {
    fetchValues();
    fetchIndexes();
  },[]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await axios.post("/api/values", {
      index
    });
    setIndex("");
  };

  const renderValues = () => {
    const entries = [];

    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I Calculated {values[key]}
        </div>
      );
    }
    return entries;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Enter your index:</label>
        <input
          value={index}
          onChange={event => setIndex(event.target.value)}
        />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {seenIndexes.join(", ")}

      <h3>Calculated Values:</h3>
      {renderValues()}
    </div>
  );
};

export default Fb;
