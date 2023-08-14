interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface Arguments {
    hours: number[],
    target: number
}

const parseExerciseArguments = (args: string[]): Arguments => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const hours: number[] = [];

    if (isNaN(Number(args[2]))) {
        throw new Error('Target must be a number');
    }

    for (let i = 3; i < args.length; i++) {
        if (isNaN(Number(args[i]))) {
            throw new Error('Provided values must be numbers');
        } else {
            hours.push(Number(args[i]));
        }
    }

    return {
        hours: hours,
        target: Number(args[2])
    };
};

export const calculateExercises = (hours: number[], target: number): Result => {
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
    };
};

try {
    const { hours, target } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(hours, target));
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log(error.message);
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));