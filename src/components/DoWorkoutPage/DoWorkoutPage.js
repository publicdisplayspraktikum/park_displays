import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styles from './DoWorkoutPage.module.scss';
import BodyweightData from '../../data/BodyweightData';


class DoWorkoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      round: 0,
      exercise: 0,
      secsBreak: null,
      startBreak: 10,
      finished: false
    };
  }

  nextButtonClick = () => {
    if (this.props.match.params.workoutType === 'bodyweight') {
      const workout = BodyweightData.workouts.filter(workout => workout.id == this.props.match.params.workoutId)[0];
      if (this.state.exercise + 1 === workout.rounds[this.state.round].exercises.length && this.state.round + 1 === workout.rounds.length) {
        this.setState(prevState => ({
          ...prevState,
          finished: true
        }))
      } else if (this.state.exercise + 1 === workout.rounds[this.state.round].exercises.length && this.state.round + 1 < workout.rounds.length) {
        this.setState(prevState => {
          return {
            ...prevState,
            round: prevState.round + 1,
            exercise: 0,
            secsBreak: workout.breakBetweenRounds,
            startBreak: workout.breakBetweenRounds,
          };
        })
        // NEXT ROUND
      } else {
        // NEXT EXERCISE
        this.setState(prevState => ({
          ...prevState,
          exercise: prevState.exercise + 1
        }))
      }
    }
  };

  decreaseBreakSecs = () => {
      this.setState(prevState => {
        if (prevState.secsBreak - 1 === 0) {
          return {
            ...prevState,
            secsBreak: null
          };
        }

        return {
          ...prevState,
          secsBreak: prevState.secsBreak - 1
        };
      });
  };

  render() {
    const { round, exercise, secsBreak, startBreak, finished } = this.state;

    if (this.props.match.params.workoutType === 'bodyweight') {
      const workout = BodyweightData.workouts.filter(workout => workout.id == this.props.match.params.workoutId)[0];
      const exerciseId = workout.rounds[round].exercises[exercise].exerciseId;
      const reps = workout.rounds[round].exercises[exercise].reps;

      if (secsBreak) {
        return (
          <div className={styles['DoWorkoutPage']}>
            <section className={styles['TextSection']}>
              <h2>{workout.name}</h2>
              <h1>Break</h1>
              <div style={{textAlign: 'center'}}>
                <CircularProgressbar className={styles['Timer']} value={secsBreak} maxValue={startBreak} text={secsBreak} />
              </div>
            </section>
          </div>
        );
      }

      if (finished) {
        return (
          <div className={styles['DoWorkoutPage']}>
            <section className={styles['TextSection']}>
              <h2>{workout.name}</h2>
              <div className={styles['Trophy']}>
                <span>WORKOUT COMPLETED</span>
                <FontAwesomeIcon icon="trophy" />
              </div>
            </section>
          </div>
        );
      }

      const currentExercise = BodyweightData.exercises.filter(exercise => exercise.id == exerciseId)[0];

      return (
        <div className={styles['DoWorkoutPage']}>
          <section className={styles['TextSection']}>
            <h2>{workout.name}</h2>
            <h1>{workout.rounds[round].exercises[exercise].reps}x {currentExercise.name}</h1>
            <div style={{textAlign: 'center', paddingTop: '1rem'}}>
              <img src={currentExercise.image} style={{width: '80%'}} />
            </div>
            <button onClick={this.nextButtonClick} className={styles['StartButton']}>Next Exercise</button>
          </section>
        </div>
      );
    }
    return null;
  }

  componentDidMount() {
    setInterval(() => {
      if (this.state.secsBreak !== null) {
        this.decreaseBreakSecs();
      }
    }, 1000);
  }
}

export default DoWorkoutPage;