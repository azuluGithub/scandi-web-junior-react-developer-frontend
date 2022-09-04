import { PureComponent } from 'react';

import { ChildrenType } from 'Type/Common';

import './ContainerWrapper.style.scss';

class ContainerWrapperComponent extends PureComponent {
    static propTypes = {
        children: ChildrenType.isRequired,
    }

    renderContainerWrapper() {
        const { children } = this.props;

        return (
            <div className='ContainerWrapper'>
               { children }
            </div>
        );
    }

    render() {
        return this.renderContainerWrapper();
    }
}

export default ContainerWrapperComponent;

