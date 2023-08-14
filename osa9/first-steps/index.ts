import express from 'express';
import { calculateBmi } from './bmiCalculator';
// import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_request, response) => {
    response.send('Hello Full Stack!');
});

app.get('/bmi', (request, response) => {
    const { height, weight } = request.query;
    if (isNaN(Number(height)) || isNaN(Number(weight))) {
        response.status(400).json({ error: 'malformatted parameters' });
    }
    response.json({
        height: height,
        weight: weight,
        bmi: calculateBmi(Number(height), Number(weight))
    });
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});