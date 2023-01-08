import React, { useState } from "react"
import blob1 from "../assets/blob-1.png"
import blob2 from "../assets/blob-2.png"
import "./Questions.css"
import Question from "./Question"

function Questions(props) {
	const [isCheck, setIsCheck] = useState(false)
	const [marks, setMarks] = useState(0)

	function calculateMarks() {
		setMarks(() => {
			let c = 0
			props.questions.forEach((question) => {
				question.options.forEach((option) => {
					if (option.isSelected && option.text === question.correct_answer) c++
				})
			})
			return c
		})
	}

	return (
		<section className="questions-page">
			<img src={blob1} alt="blob-1" className="blob-1" />
			<img src={blob2} alt="blob-2" className="blob-2" />
			<div className="questions">
				{props.questions.map((question, index) => (
					<Question
						key={index}
						question={question}
						selectOption={(optionId) => props.selectOption(question.id, optionId)}
						isCheck={isCheck}
					/>
				))}
			</div>
			<div className="footer-cta">
				{isCheck && <p className="score">You scored {marks}/10 correct answers</p>}
				<button
					className="submit-btn"
					onClick={
						isCheck
							? () => {
									props.fetchQuestions()
									setIsCheck((prev) => !prev)
							  }
							: () => {
									calculateMarks()
									setIsCheck((prev) => !prev)
							  }
					}
				>
					{isCheck ? "Play again" : "Check answers"}
				</button>
			</div>
		</section>
	)
}

export default Questions
