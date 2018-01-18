import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data:
      [
        {
          "id":1,
          "name":"Foo",
          "age":"20"
        },
        {
          "id":2,
          "name":"Bar",
          "age":"30"
        },
        {
          "id":3,
          "name":"Baz",
          "age":"60"
        }
      ],
      data1:
      [],
      data2:0,
      data3:'',
      data4:[
            {
               component: 'First...',
               id: 1
            },
            {
               component: 'Second...',
               id: 2
            },
            {
               component: 'Third...',
               id: 3
            }
         ]
    }
    this.setStateHandler = this.setStateHandler.bind(this);
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    this.changeDomProperty = this.changeDomProperty.bind(this);
    this.setNewNumber = this.setNewNumber.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.clearInput = this.clearInput.bind(this);

  }
  setStateHandler(){
    var item = "print...";
    var myArray = this.state.data1.slice();
    myArray.push(item);
    this.setState({data1: myArray})
  };
  setNewNumber(){
    this.setState({ data2: this.state.data2+1})
  }

  forceUpdateHandler(){
    this.forceUpdate();
  };

  changeDomProperty(){
    var element = document.getElementById('displayTable');
    ReactDOM.findDOMNode(element).style.backgroundColor = "green";

  };

  updateForm(e){
    this.setState({data3: e.target.value});
  }

  clearInput(){
    this.setState({data3: ''});
      ReactDOM.findDOMNode(this.refs.refId).focus();
  }






  render() {
    return (
      <div>
        <Header/>
        <Content/>
        <Appvalidation/>
          {this.state.data4.map((dynamicComponent, i) => <ComponentIterate 
                    key = {i} componentData = {dynamicComponent}/>)}
          <div>
              <button onClick = {this.setNewNumber}>INCREMENT</button>
              <ComponentLifeCycle myNumber = {this.state.data2}/>
           </div>
        <table id="displayTable">
          <tbody>
            {this.state.data.map((person, i) =>
              <TableRow
                key = {i}
                data = {person} />
            )}
          </tbody>
        </table>
        <div>
          <button onClick = {this.setStateHandler}>
            SET STATE
          </button>
          <h4>
            State Array: {this.state.data1}
          </h4>
        </div>
        <div>
          <button onClick = {this.changeDomProperty}>
            Update Dom
          </button>
        </div>
        <div>
          <button onClick = {this.forceUpdateHandler}>
            FORCE UPDATE
          </button>
          <h4>
            Random number: {Math.random()}
          </h4>
        </div>
        <div>
          <input type="text" value={this.state.data3} onChange={this.updateForm} ref="refId"/>
          <h4>{this.state.data3}</h4>
          <button onClick = {this.clearInput}>CLEAR</button>
        </div>
        <ComponentSubForm myData={this.state.data3} updateForm={this.updateForm} />
      </div>

    );
  }
}

class ComponentIterate extends React.Component{
  render(){
    return(
      <div>
        <div>{this.props.componentData.component}</div>
        <div>{this.props.componentData.id}</div>
      </div>
    );
  }
}

class ComponentSubForm extends React.Component{

  render() {
     return (
       <div>embeeded Form
         <input type="text" value={this.props.myData} onChange={this.props.updateForm}/>
         <h1>{this.props.myData}</h1>
       </div>
     );

}
}

class ComponentLifeCycle extends React.Component{
  componentWillMount(){
    console.log('Component WILL MOUNT!')
  }
  componentDidMount(){
    console.log('Component Did MOUNT!')
  }
  componentWillReceiveProps(newProps){
    console.log('Component will receive props:'+Object.values(newProps));
  }
  shouldComponentUpdate(newProps,newState){
    return true;
  }
  componentWillUpdate(nextProps, nextState) {
      console.log('Component WILL UPDATE!');
   }
   componentDidUpdate(prevProps, prevState) {
      console.log('Component DID UPDATE!')
   }
   componentWillUnmount() {
      console.log('Component WILL UNMOUNT!')
   }
   render() {
      return (
         <div>
            <h3>{this.props.myNumber}</h3>
         </div>
      );
   }
}

class Appvalidation extends React.Component{
  render() {
    return(
      <div>
        <h1> Hello, {this.props.name} </h1>
        <h3>
          Array: {this.props.propArray}
        </h3>
        <h3>
          Bool: {this.props.propBool ? "True..." : "False..."}
        </h3>
        <h3>
          Func: {this.props.propFunc(3)}
        </h3>
        <h3>
          Number: {this.props.propNumber}
        </h3>
        <h3>
          String: {this.props.propString}
        </h3>
      </div>

    );
  }
}
Appvalidation.propTypes = {
  name : PropTypes.string,
  propArray : PropTypes.array.isRequired,
  propBool : PropTypes.bool.isRequired,
  propFunc : PropTypes.func,
  propNumber : PropTypes.number,
  propString : PropTypes.string,
};
Appvalidation.defaultProps = {
  name: 'test Insertion Titre',
  propArray: [1,2,3,4,5],
  propBool: true,
  propFunc: function(e){ return e},
  propNumber: 1,
  propString:"String value..."
}
class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>
          Header test
        </h1>
      </div>
    );
  }
}
class Content extends React.Component {
  render() {
    return (
      <div>
        <h2>Content</h2>
        <p>
          The content text!!!
        </p>
      </div>
    );
  }
}

class TableRow extends React.Component {
  render() {
    return (
      <tr>
        <td>
          {this.props.data.id}
        </td>
        <td>
          {this.props.data.name}
        </td>
        <td>
          {this.props.data.age}
        </td>
      </tr>
    );
  }
}
export default App;
