import {Component} from 'react';

const instances = new Set();
let translations;

export default class Translation extends Component {
  state = {}

  static setTranslations (list) {

    translations = list;
    instances.forEach(instance => instance.setTranslation(translations));
  }

  componentWillMount() {
    if (translations) {
      this.setTranslation(translations);
    } else {
      instances.add(this);
    }
  }
  componentWillUnmount() {
    instances.delete(this);
  }

  setTranslation(translations) {
    console.log(this.props.trans,translations);
    var trans = translations.find(({key}) => key === this.props.trans);
    this.setState({
      value: trans ? trans.value : this.props.trans
    });
  }

  render() {
    return <span>{this.state.value}</span>;

  }
};