import React from 'react';
import {render} from 'react-dom';
import Events from 'events';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

var Channel = new Events.EventEmitter();
var minhaDiv = document.getElementById('container');

class TextCounter extends React.Component{

    static defaultProps = {

    }

    state = {
        totalChars: 0,
    }

    handleChange = (event)=>{
        var element = event.target;
        var text = element.value;
        this.setState({totalChars: text.length});
    }

    render(){
        return (
            <div>
                <textarea onChange={this.handleChange.bind(this)} />
                <div><b>Total:</b> {this.state.totalChars}</div>
            </div>
        )
    }
}

export default class TreinaWeb extends React.Component {
  state = {
    totalClicks: 0,
    items: []
  }
  childClick = () => {
    var totalClicks = ++this.state.totalClicks;
    this.setState({totalClicks});
  }
  componentDidMount = () => {
    Channel.on('listItem.click', this.childClick);
    Channel.on('listItem.remove', this.removeItem);
  }
  componentWillUnmount = () => {
    Channel.removeListener('listItem.click', this.childClick);
    Channel.removeListener('listItem.remove', this.removeItem);
  }
  removeItem = (index) => {
    var items = this.state.items;
    items.splice(index, 1);
    this.setState({items});
  }
  insertItem = () => {
    var items = this.state.items;
    var text = this.refs.listItemText.input.value || `Item ${items.length+1}`;
    this.refs.listItemText.input.value = "";
    items.push({text});
    this.setState({items});
  }
  render() {
    var props = this.props;
    var state = this.state;
    return (
      <div>
        <h3> Total de Itens : {state.items.length} </h3>
        <h3> Total de Cliques: {state.totalClicks} </h3>
        <TextField id="textField" ref="listItemText" />
        <RaisedButton  label="New Item" onClick={this.insertItem} primary={true} />
        <ul>
          <ReactCSSTransitionGroup transitionName="transitionList" transitionEnterTimeout={300} transitionLeaveTimeout={500}>
            {
              this.state.items.map((item, index) => {
                return <MyListItem  color="black" key={index} index={index} text={item.text} />
              })
            }
          </ReactCSSTransitionGroup>
        </ul>
      </div>
    );
  }
}

class MyListItem extends React.Component {
  state = {
    totalClicks: 0
  }
  click = () =>{
    var totalClicks = ++this.state.totalClicks;
    this.setState({totalClicks});
    Channel.emit('listItem.click');
  }
  remove = () => {
    Channel.emit('listItem.remove', this.props.index);
  }
  render(){
    var style = {color: this.props.color, fontFamily: 'Sans Serif'};
    return (
      <li onClick={this.click} style={style}>
        {this.props.text} - {this.state.totalClicks}
        <RaisedButton label="Remove" onClick={this.remove} secondary={true}  />
      </li>
    );
  }
}