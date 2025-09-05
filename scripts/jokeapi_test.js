import http from "k6/http";
import { check, group, sleep } from "k6";
import { Trend, Rate } from "k6/metrics";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// Métricas personalizadas
export let jokeDuration = new Trend("joke_duration", true);
export let jokeSuccessRate = new Rate("joke_success_rate");

// Configuração do teste
export const options = {
  vus: 10,
  duration: "30s",
  thresholds: {
    joke_duration: ["p(95)<2000"],
    joke_success_rate: ["rate>0.95"],
  },
};

// Categorias da API a testar
const categories = ["Programming", "Misc", "Pun"];

// Função para validar retorno da API
function validateJokeResponse(res) {
  const statusCheck = res.status === 200;
  const contentCheck = res.headers["Content-Type"] && res.headers["Content-Type"].includes("application/json");
  const jokeCheck = typeof res.json().joke === "string";

  const success = statusCheck && contentCheck && jokeCheck;

  if (!success) {
    console.error(`Falha na requisição: status=${res.status}, body=${res.body}`);
  }

  return success;
}

// Função principal do teste
export default function () {
  categories.forEach((category) => {
    group(`JokeAPI - ${category} Joke`, () => {
      const res = http.get(`https://v2.jokeapi.dev/joke/${category}?type=single`);

      jokeDuration.add(res.timings.duration);

      const success = validateJokeResponse(res);
      jokeSuccessRate.add(success ? 1 : 0);

      sleep(1);
    });
  });
}

// Função para gerar relatórios automaticamente
export function handleSummary(data) {
  return {
    "results/jokeapi_report.html": htmlReport(data), // relatório HTML visual
    "results/jokeapi_results.json": JSON.stringify(data, null, 2), // JSON com métricas completas
  };
}
