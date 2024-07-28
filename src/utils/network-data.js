export async function fetchQuestions() {
  const response = await fetch("https://opentdb.com/api.php?amount=5&category=27&difficulty=easy");
  const data = await response.json();
  return data.results;
}
