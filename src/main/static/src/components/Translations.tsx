import React, {Component} from 'react';

const instances: Set<any> = new Set();
let translations;

type Props = { trans: any };
type State = { value?: any };

export default class Translation extends Component<Props, State> {
    state = {
        value: undefined
    }

    static setTranslations(list) {

        translations = list;
        instances.forEach(instance => instance.setTranslation(translations));
    }

    UNSAFE_componentWillMount() {
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
        const trans = translations.find(({key}) => key === this.props.trans);
        this.setState({
            value: trans ? trans.value : this.props.trans
        });
    }

    render() {
        return <span>{this.state.value}</span>;

    }
};