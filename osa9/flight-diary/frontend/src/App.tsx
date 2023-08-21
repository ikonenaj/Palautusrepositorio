import axios, { AxiosError } from 'axios';
import { useState, useEffect } from "react";
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry, Visibility, Weather } from './types';

const App = () => {
  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newComment, setNewComment] = useState('');
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get<NonSensitiveDiaryEntry[]>('http://localhost:3001/api/diaries').then(response => {
      setDiaries(response.data);
    });
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const diaryToAdd: NewDiaryEntry = {
      date: newDate,
      visibility: newVisibility as Visibility,
      weather: newWeather as Weather,
      comment: newComment
    };
      axios.post<DiaryEntry>('http://localhost:3001/api/diaries', diaryToAdd).then(response => {
        const { comment, ...newDiaryEntry } = response.data;
        setDiaries(diaries.concat(newDiaryEntry));
        setNewDate('');
        setNewVisibility('');
        setNewWeather('');
        setNewComment('');
      })
      .catch(e => {
        const error = e as AxiosError;
        if (error.response) {
          const errorMessage = error.response.data;
          setError(errorMessage as string);
          setTimeout(() => {
            setError('');
          }, 5000);
        }
      });
    }


  return (
    <div className="App">
      <h2>Add new entry</h2>
      <p style={{color: 'red'}}>{error}</p>
      <form onSubmit={diaryCreation}>
        date
        <input value={newDate} onChange={event => setNewDate(event.target.value)} /><br />
        visibility
        <input value={newVisibility} onChange={event => setNewVisibility(event.target.value)} /><br />
        weather
        <input value={newWeather} onChange={event => setNewWeather(event.target.value)} /><br />
        comment
        <input value={newComment} onChange={event => setNewComment(event.target.value)} /><br />
        <button type='submit'>add</button>
      </form>
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
