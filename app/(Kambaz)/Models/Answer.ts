export default interface Answer {
    questionId: string,
    selectedChoices: string[];
    trueFalse: boolean | null,
    fillIn: string,
    correct: boolean;
}