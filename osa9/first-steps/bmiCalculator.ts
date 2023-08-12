interface BmiValues {
    height: number;
    weight: number;
}

const parseArguments = (args: string[]): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        weight: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
}

const calculateBmi = (height: number, weight: number): string => {
    const bmi: number = weight / (height / 100) **2;
    if (bmi < 16) {
        return 'Underweight (Severe thinness)';
    }
    if (bmi < 17) {
        return 'Underweight (Moderate thinness)';
    }
    if (bmi < 18.5) {
        return 'Underweight (Mild thinness)';
    }
    if (bmi < 25) {
        return 'Normal (healthy weight)';
    }
    if (bmi < 30) {
        return 'Overweight (Pre-obese)';
    }
    if (bmi < 35) {
        return 'Obese (Class I)';
    }
    if (bmi < 40) {
        return 'Obese (Class II)';
    }
    return 'Obese (Class III)';
}

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log(error.message);
    }
}
console.log(calculateBmi(183, 74));