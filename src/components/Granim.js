import React, { Component } from 'react';
import PropsType from 'prop-types';
import granim from 'granim';

export default class Granim extends Component {
    static propsType = {
        className: PropsType.string,
        name: PropsType.string,
        elToSetClassOn: PropsType.string,
        direction: PropsType.oneOf([
            'diagonal',
            'left-right',
            'top-bottom',
            'radial'
        ]),
        isPausedWhenNotInView: PropsType.bool,
        opacity: PropsType.arrayOf(PropsType.number).isRequired,
        stateTransitionSpeed: PropsType.number,
        defaultStateName: PropsType.string,
        states: PropsType.object.isRequired
    }

    static defaultProps = {
        id: `granim-canvas-${Math.random().toString(36).substring(2)}`,
        defaultStateName: 'default-state'
    }

    get config() {
        // default
        return {
            element: `#${this.props.id}`,
            className: this.props.className,
            opacity: [1, 1],
            states: {
                [this.props.defaultStateName]: {
                    gradients: [
                        ['#EB3349', '#F45C43'],
                        ['#FF8008', '#FFC837'],
                        ['#4CB8C4', '#3CD3AD'],
                        ['#24C6DC', '#514A9D'],
                        ['#FF512F', '#DD2476'],
                        ['#DA22FF', '#9733EE']
                    ],
                    transitionSpeed: 2000
                }
            }
        }
    }

    get style() {
        return {
            zIndex: 10
        }
    }

    componentDidMount() {
        this.granim = new granim(Object.assign({}, this.config, this.props));
    }

    render() {
        const { id, className, width, height } = this.props;
        return <canvas style={this.style} width={width} height={height} id={id} className={className} />
    }
}