import axios, { AxiosError } from 'axios';
import { useState, useEffect } from "react";
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry, Visibility, Weather } from './types';

const App = () => {
  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newComment, setNewComment] = useState('');
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get<DiaryEntry[]>('http://localhost:3001/api/diaries').then(response => {
      console.log(response.data);
      setDiaries(response.data);
    });
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    console.log(event);
    event.preventDefault();
    const diaryToAdd: NewDiaryEntry = {
      date: newDate,
      visibility: newVisibility as Visibility,
      weather: newWeather as Weather,
      comment: newComment
    };
      axios.post<DiaryEntry>('http://localhost:3001/api/diaries', diaryToAdd).then(response => {
        setDiaries(diaries.concat(response.data));
        setNewDate('');
        setNewVisibility('');
        setNewWeather('');
        setNewComment('');
        const form = document.getElementById('diary-form') as HTMLFormElement
        form.reset();
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
      <form id='diary-form' onSubmit={diaryCreation}>
        date{' '}
        <input type='date' onChange={event => setNewDate(event.target.value)}/><br />
        <div>
          visibility{' '}
          <input type='radio' id='great' name='visibility' onChange={() => setNewVisibility('great')} />
          <label htmlFor='great'>great</label>

          <input type='radio' id='good' name='visibility' onChange={() => setNewVisibility('good')} />
          <label htmlFor='good'>good</label>

          <input type='radio' id='ok' name='visibility' onChange={() => setNewVisibility('ok')} />
          <label htmlFor='ok'>ok</label>

          <input type='radio' id='poor' name='visibility' onChange={() => setNewVisibility('poor')} />
          <label htmlFor='poor'>poor</label>
        </div>
        <div>
          weather
          <input type='radio' id='sunny' name='weather' onChange={() => setNewWeather('sunny')} />
          <label htmlFor='sunny'>sunny</label>

          <input type='radio' id='rainy' name='weather' onChange={() => setNewWeather('rainy')} />
          <label htmlFor='rainy'>rainy</label>

          <input type='radio' id='cloudy' name='weather' onChange={() => setNewWeather('cloudy')} />
          <label htmlFor='cloudy'>cloudy</label>

          <input type='radio' id='stormy' name='weather' onChange={() => setNewWeather('stormy')} />
          <label htmlFor='stormy'>stormy</label>

          <input type='radio' id='windy' name='weather' onChange={() => setNewWeather('windy')} />
          <label htmlFor='windy'>windy</label>
        </div>
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
