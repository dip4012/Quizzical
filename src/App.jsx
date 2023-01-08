import { useState } from "react"
import blob1 from "./assets/blob-1.png"
import blob2 from "./assets/blob-2.png"
import axios from "axios"
import "./App.css"
import Questions from "./components/Questions"
import { nanoid } from "nanoid"

function App() {
	const [questions, setQuestions] = useState([])

	function fetchQuestions() {
		axios.get("https://opentdb.com/api.php?amount=10").then((res) => {
			setQuestions(() =>
				res.data.results.map((item) => ({
					id: nanoid(),
					text: item.question,
					correct_answer: item.correct_answer,
					options: [item.correct_answer, ...item.incorrect_answers]
						.sort()
						.map((option) => ({
							id: nanoid(),
							text: option,
							isSelected: false,
						})),
				}))
			)
			// console.log(res)
		})
	}

	function selectOption(questionId, optionId) {
		setQuestions((oldQuestions) =>
			oldQuestions.map((question) =>
				question.id === questionId
					? {
							...question,
							options: question.options.map((option) =>
								option.id === optionId
									? { ...option, isSelected: true }
									: { ...option, isSelected: false }
							),
					  }
					: question
			)
		)
	}

	return (
		<main>
			{questions.length === 0 ? (
				<section className="welcome-page">
					<img src={blob1} alt="blob-1" className="blob-1" />
					<img src={blob2} alt="blob-2" className="blob-2" />
					<h1 className="title">Quizzical</h1>
					<p className="description">
						Assess your quizzzing power by take the small quizzical round
					</p>
					<button className="start-btn" onClick={fetchQuestions}>
						Start quiz
					</button>
				</section>
			) : (
				<Questions
					fetchQuestions={fetchQuestions}
					questions={questions}
					selectOption={selectOption}
				/>
			)}
		</main>
	)
}

export default App
