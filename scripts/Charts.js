import React from 'react';
import {render} from 'react-dom';
import Highcharts from 'highcharts';
import higchartsDrilldown from 'highcharts/modules/drilldown';
import LibraryStorage from "./LibraryStorage";
import BookListChart from "./BookListChart";
import Channel from "./Channel";
const defaultConfig = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'My Reading Progress'
        },
        xAxis: {
            type: 'category'
        },

        legend: {
            enabled: false
        },
        tooltip: {
            enabled: true
        },
        plotOptions: {
            series: {
                point: {
                    events: {
                        click:function (e) {
                          if (e.point.series)
                            Channel.emit('myBooklist.showBookListByMonth' , e.point.index, e.point.series.options.id);
                        }
                    }
                }
            }
        },
        series: [],
        drilldown: {series:[]}
};




class Chart extends React.Component {
  componentDidMount =  () => {
      if (this.props.modules) {
          this.props.modules.forEach(function (module) {
              module(Highcharts);
          });
      }

      this.chart = new Highcharts[this.props.type || "Chart"](
          this.props.container,
          this.props.options,
          this.props.modules
      );
  }


  render() {
      return (<div  id ={this.props.container} ></div>);
  }
}

class Charts extends React.Component {
  state = {
    config: {}
  }
  componentWillMount = () => {
    var data = LibraryStorage.DB.getChartData();
    this.setState({data: data});
    var config = defaultConfig;
    config.series = data.series;
    config.drilldown.series = data.drilldown.series;
    this.setState({config :config});
  }
  render() {
    return(
      <div>
        <BookListChart />
        <Chart container='Chart' options={this.state.config} modules={[higchartsDrilldown]} />
      </div>);
  }
}

export default Charts;
