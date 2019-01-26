import React from 'react';
import UserInfo from './UserInfo';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      data: [],
      refreshing: false,
      value: 500,
      filteredData: []
    }
  }

  sortDataByComments = () => {
    return this.state.data.sort((a,b) => {
      return b.data.num_comments - a.data.num_comments
    })
  }

  filterData = (event,value) => {
    this.setState({
       value
    },() => {
      let i = this.sortDataByComments().filter(item => item.data.num_comments >= this.state.value);
      console.log(i)
      this.setState({
        filteredData: i
      })
    })
  }



  getData = () => {
    console.log("getdata");
    fetch("https://www.reddit.com/r/aww.json")
    .then(response => {
     return response.json()
    })
    .then(data => {
        this.setState({
         data: data.data.children
        }) 
    })
    .catch(error => {
      console.log("Error getting data", error.message)
    })
  }
  
  
  startRefreshing = () => {
    this.setState({
      refreshing: !this.state.refreshing
    }, () => {
      if(this.state.refreshing) {
        this.stas = setInterval(() => {
          this.getData()
        }, 3000)
    }
    else{
      clearInterval(this.stas)
    }})
}
   
  chooseData = () => {
    if(this.state.filteredData.length > 0) {
      return this.state.filteredData
    }
    else{
      return this.sortDataByComments();
    }
  }
  
  
  componentDidMount() {
    this.getData();
  }

  render() {
    const sortedData =  this.chooseData();
    return (
      <div className="user-boby">
        <header>Top commented</header>
        <button className="button" onClick={this.startRefreshing}>Update data</button>
        <div className="root">
        <Typography id="label">Slider label</Typography>
        <Slider
          className="slider"
          value={this.state.value}
          aria-labelledby="label"
          onChange={this.filterData}
          
        />
      </div>
        <div className= "user-list">
        {sortedData.map(user => {
         return <UserInfo user={user} />
        } )}
        </div>
       
      </div>
    );
  }
}

export default App;
