import axios from 'axios';
import { useState, useEffect } from "react";

interface Diary {
  id: string;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

type NonSensitiveDiary = Omit<Diary, 'comment'>

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiary[]>([]);

  useEffect(() => {
    axios.get<NonSensitiveDiary[]>('http://localhost:3001/api/diaries').then(response => {
      setDiaries(response.data);
    });
  }, []);

  return (
    <div className="App">
      <h2>Diary entries</h2>
      {diaries.map(entry => 
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          <div>
            visibility: {entry.visibility}<br />
            weather: {entry.weather}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
