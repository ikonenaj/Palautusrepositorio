interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (hours: number[], target: number): Result => {
    const periodLength = hours.length;
    const trainingDays = hours.filter(day => day > 0).length;
    const average = hours.reduce((accumlator, currentValue) => accumlator + currentValue, 0) / periodLength;
    const success = average >= target;
    const rating = (() => {
        if (average < target * 0.5) {
            return 1;
        }
        if (average < target) {
            return 2;
        }
        return 3;
    })();
    const ratingDescription = (() => {
        switch (rating) {
            case 1:
                return 'A lot of room for improvement';
            case 2:
                return 'Not bad but could be better';
            case 3:
                return 'Target reached, good job!';
        }
    })();

    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));