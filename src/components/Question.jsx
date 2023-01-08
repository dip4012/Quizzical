import React from "react"
import "./Question.css"

function Question(props) {
	const parser = new DOMParser()

	function checkOption(option) {
		if (props.isCheck) {
			if (option.isSelected) {
				return props.question.correct_answer === option.text
					? "correct"
					: "incorrect"
			} else {
				return props.question.correct_answer === option.text
					? "correct"
					: "not-selected"
			}
		} else {
			return option.isSelected && "selected"
		}
	}

	return (
		<div className="question-container">
			<p className="question">
				{
					parser.parseFromString(
						`<!doctype html><body>${props.question.text}`,
						"text/html"
					).body.textContent
				}
			</p>
			{props.question.options.map((option, index) => (
				<button
					key={index}
					className={`option ${checkOption(option)}`}
					onClick={() => props.selectOption(option.id)}
					disabled={props.isCheck}
				>
					{
						parser.parseFromString(`<!doctype html><body>${option.text}`, "text/html")
							.body.textContent
					}
				</button>
			))}
		</div>
	)
}

export default Question
