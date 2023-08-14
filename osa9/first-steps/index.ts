import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

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

app.post('/exercises', (request, response) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = request.body;
    if (!daily_exercises || !target) {
        response.status(400).json({ error: 'parameters missing' });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (isNaN(target)) {
        response.status(400).json({ error: 'malformatted parameters' });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    for (let i = 0; i < daily_exercises.length; i++) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
        if (isNaN(daily_exercises[i])){
            response.status(400).json({ error: 'malformatted parameters' });
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    response.json(calculateExercises(daily_exercises, target));
    response.end();
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});