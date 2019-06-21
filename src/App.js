import React, {Component} from 'react';
import './App.css';

const newquiz={
  name:"Billy Bob"
  ,author:"Uhhh Billy Bob",
  questions: [
    {
      questionname: "Do You Like Waffles?",
      answers:[
        {
          text:"Ya! i Like WAffles!"
        }
      ]
    },
    {
      questionname: "Do You Like Pancakes??",
      answers:[{
        text:"Ya, I love pancakes!"
      }]
    }
  ]
}

class App extends Component {
  constructor(props){
    super(props);

    this.state={
      quizzes:[],
    }
  }

  componentDidMount(){
    fetch('http://localhost:8080/get-all-quizzes')
    .then(response=> {
      return response.json();
    })
    .then(myJson=> {

      // console.log(myJson);
      this.setState({quizzes: myJson}, ()=>{console.log(this.state.quizzes)});
      
    });
  }

  handleaddquiz=(e)=>{
    e.preventDefault();
    console.log(e);
 
    fetch('http://localhost:8080/add-quiz',{
      headers: {'Accept': 'application/json', "Content-Type": "application/json"}, method: "Post", body: JSON.stringify(newquiz)    })
    .then(res=>{
      if(res.status=== 200){
        console.log("quiz added")
      }else{
        console.log("you done diddly effed up")
      }
    })
    .then(function(myJson) {
      console.log(myJson);
    });
  }

  render(){
      return (
      <div className="App">
        <button onClick={e=> this.handleaddquiz(e)}>Add Quiz</button >
        {this.state.quizzes.map((quiz,index)=>{
          return(
            <div key={index}> 
              <p>{quiz.name}</p>
              <p>Author: {quiz.author}</p>
              {quiz.questions.map((question,index)=> {
                return(
                  <div key={index}>
                    <p>{index+1}.{question.questionname}</p>
                    {question.answers.map((answer, index)=>{
                      return(<div key={index}>
                        {answer.text}
                      </div>)
                    })}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    );
  }

}




export default App;
