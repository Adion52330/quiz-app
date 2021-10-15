import React from "react";
import { useState } from "react";
import "./Questions.css";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { Input } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { db } from "./firebase";

const Questions = () => {
  const [input, setInput] = useState("");
  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      height: "100px",
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const questions = [
    {
      question:
        "What did Ron call Hermione after Charms class that made her cry?",
      answers: [
        { answerText: "A nightmare", isCorrect: true },
        { answerText: "A loser", isCorrect: false },
        { answerText: "A try hard", isCorrect: false },
        { answerText: "An insufferable know-it-all ", isCorrect: false },
      ],
    },
    {
      question:
        "On the night that Harry, Ron and Hermione took on a giant troll – how many house points did they collectively gain for their efforts?",
      answers: [
        { answerText: "Ten", isCorrect: false },
        { answerText: "Fifteen", isCorrect: false },
        { answerText: "Five", isCorrect: true },
        { answerText: "Forty-five", isCorrect: false },
      ],
    },
    {
      question:
        "In Harry Potter and the Order of the Phoenix, what did Hermione get Harry and Ron for Christmas?",
      answers: [
        { answerText: "Snekoscopes", isCorrect: false },
        { answerText: "Copies of Hogwarts: A History", isCorrect: false },
        { answerText: "Honeydukes Chocolate", isCorrect: false },
        { answerText: "Homework Planner", isCorrect: true },
      ],
    },
    {
      question:
        "In the books, who was the first to get sorted into their house: Harry, Ron or Hermione?",
      answers: [
        { answerText: "Ron", isCorrect: false },
        { answerText: "Hermione", isCorrect: true },
        { answerText: "Harry", isCorrect: false },
      ],
    },
    {
      question:
        "When the trio were talking about the Deathly Hallows, which Hallow did Ron say he would like to have?",
      answers: [
        { answerText: "The Elder Wand", isCorrect: true },
        { answerText: "The Invisibility Cloak", isCorrect: false },
        { answerText: "The Ressurection Stone", isCorrect: false },
      ],
    },
    {
      question: "How many O.W.Ls did Ron get when he received his results?",
      answers: [
        { answerText: "Eight", isCorrect: false },
        { answerText: "Ten", isCorrect: false },
        { answerText: "Seven", isCorrect: true },
        { answerText: "Nine", isCorrect: false },
      ],
    },
    {
      question:
        "And which two subjects did both Harry and Ron get Fail Grades in?",
      answers: [
        { answerText: "Charms and Potion", isCorrect: false },
        {
          answerText: "Care of Magical Creatures and Astronomy",
          isCorrect: false,
        },
        { answerText: "History of magic and Divination", isCorrect: true },
        { answerText: "Divination and Potion", isCorrect: false },
      ],
    },
    {
      question:
        "After escaping Bill and Fleur’s wedding, where in London does Hermione take Harry and Ron?",
      answers: [
        { answerText: "Hampstead Heath", isCorrect: false },
        {
          answerText: "Brick Lane",
          isCorrect: false,
        },
        { answerText: "Tottenham Court Road", isCorrect: true },
        { answerText: "Leicester Square", isCorrect: false },
      ],
    },
    {
      question:
        "And finally, in Harry Potter and the Prisoner of Azkaban, where were Hermione and Ron waiting for Harry, who had taken refuge in Diagon Alley?",
      answers: [
        { answerText: "The Leaky Cauldron", isCorrect: false },
        {
          answerText: "Madam Malkin's",
          isCorrect: false,
        },
        {
          answerText: "Florean Fortescue's Ice Cream Parlour",
          isCorrect: true,
        },
        { answerText: "Flourish and Botts", isCorrect: false },
      ],
    },
  ];
  const [num, setNum] = useState(0);
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);
  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    const nextQuestion = num + 1;
    if (nextQuestion < questions.length) {
      setNum(nextQuestion);
    } else {
      setDone(true);
    }
  };
  const send = (e) => {
    e.preventDefault();
    const data = {
      name: input,
      score: score,
    };
    db.collection("scores").add(data);
    setOpen(false);
  };
  return (
    <div className="questions">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="forma">
            <Input
              placeholder="Please enter your name"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <br />
            <br />
            <Button variant="contained" color="primary" onClick={send}>
              Save
            </Button>
          </form>
        </div>
      </Modal>
      <div className="wrapper">
        {done ? (
          <>
            <h1 className="questions__address">
              You scored {score} out of {questions.length}
            </h1>
            <p>Source: Wizarding World(quizzes)</p>
            <button className="answers__button" onClick={() => setOpen(true)}>
              Save and Exit
            </button>
          </>
        ) : (
          <>
            <h1 className="questions__address">
              Question: {num + 1}/{questions.length}
            </h1>
            <h3 className="questions__question">{questions[num].question}</h3>
            <div className="ans">
              {questions[num].answers.map((answers) => (
                <button
                  className="answers__button"
                  onClick={() => handleAnswerClick(answers.isCorrect)}
                >
                  {answers.answerText}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Questions;
